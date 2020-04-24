import { take, put, select } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import * as mutations from './mutations'

const serverUrl = 'http://localhost:7777'

export function* taskCreationSaga() {
  while ( true ) {
    const { groupId } = yield take(mutations.REQUEST_TASK_CREATION)
    const ownerId = `U1`
    const taskId = uuid()
    yield put(mutations.createTask(taskId, groupId, ownerId))
    const { res } = yield axios.post(`${serverUrl}/task`, {
      task: {
        id: taskId,
        name: 'New task from react app',
        group: groupId,
        owner: ownerId,
        isComplete: false,
      }
    })
    console.log('POST success', res)
  }
}

export function* taskUpdateSaga() {
  while ( true ) {
    const mutation = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_STATUS
    ])
    const { type, ...task } = mutation
    const { taskId, groupId, name, isComplete } = task
    yield axios.patch(`${serverUrl}/task/${taskId}`, {
      task: {
        id: taskId,
        ...(groupId) && { group: groupId },
        ...(name) && { name },
        ...(isComplete === true || isComplete === false) && { isComplete },
      }
    })
  }
}

