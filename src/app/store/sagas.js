import { put, select, take } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import * as mutations from './mutations'
import { history } from './history'

const isProd = process.env.NODE_ENV === `production`
const serverUrl = isProd ? `` : `http://localhost:7777`

export function* taskCreationSaga() {
  while (true) {
    const { groupId } = yield take(mutations.REQUEST_TASK_CREATION)
    const ownerId = yield select((state) => state.session.id)
    const taskId = uuid()
    const taskName = 'New task from react app'
    yield put(mutations.createTask(taskId, taskName, groupId, ownerId))
    yield axios.post(`${serverUrl}/task`, {
      task: {
        id: taskId,
        name: taskName,
        group: groupId,
        owner: ownerId,
        isComplete: false,
      },
    })
  }
}

export function* taskUpdateSaga() {
  while (true) {
    const mutation = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_STATUS,
    ])
    const { type, ...task } = mutation
    const { taskId, groupId, name, isComplete } = task
    yield axios.patch(`${serverUrl}/task/${taskId}`, {
      task: {
        id: taskId,
        ...(groupId && { group: groupId }),
        ...(name && { name }),
        ...((isComplete === true || isComplete === false) && { isComplete }),
      },
    })
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_USER_AUTHENTICATION
    )
    try {
      const { data } = yield axios.post(`${serverUrl}/authenticate`, {
        username,
        password,
      })
      if (!data) throw new Error('No data from server')
      console.log('AUTHENTICATED', data)
      yield put(mutations.setAppState(data.state))
      yield put(mutations.setUserAuthenticationStatus(mutations.AUTHENTICATED))
      history.push('/dashboard')
    } catch (e) {
      console.log(`Error authenticating: \n${e}`)
      yield put(
        mutations.setUserAuthenticationStatus(mutations.NOT_AUTHENTICATED)
      )
    }
  }
}

export function* commentCreationSaga() {
  while (true) {
    const { task, comment } = yield take(mutations.REQUEST_ADD_COMMENT)
    const commentId = uuid()
    const owner = yield select((state) => state.session.id)
    yield put(mutations.createComment(commentId, task, comment, owner))
    yield axios.post(`${serverUrl}/comment`, {
      comment: {
        id: commentId,
        content: comment,
        task,
        owner,
      },
    })
  }
}
