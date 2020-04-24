import { applyMiddleware, combineReducers, createStore } from 'redux'
import { defaultState } from '../../server/default-state'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as sagas from './sagas'
import * as mutations from './mutations'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({
      tasks(tasks = defaultState.tasks, action) {
        switch ( action.type ) {
          case mutations.CREATE_TASK: {
            const { taskId, groupId, ownerId } = action
            return [
              ...tasks,
              {
                id: taskId,
                name: 'New task',
                group: groupId,
                owner: ownerId,
                isComplete: false
              }
            ]
          }
          case mutations.SET_TASK_STATUS: {
            const { taskId, isComplete } = action
            const taskIndex = tasks.findIndex(task => task.id === taskId)
            const updatedTask = {
              ...tasks[taskIndex],
              isComplete
            }
            return updateOneTask(tasks, updatedTask, taskIndex)
          }
          case mutations.SET_TASK_GROUP: {
            const { taskId, groupId } = action
            const taskIndex = tasks.findIndex(task => task.id === taskId)
            const updatedTask = {
              ...tasks[taskIndex],
              group: groupId
            }
            return updateOneTask(tasks, updatedTask, taskIndex)
          }
          case mutations.SET_TASK_NAME: {
            const { taskId, name } = action
            const taskIndex = tasks.findIndex(task => task.id === taskId)
            const updatedTask = {
              ...tasks[taskIndex],
              name
            }
            return updateOneTask(tasks, updatedTask, taskIndex)
          }
        }
        return tasks
      },
      comments(comments = defaultState.comments, action) {
        return comments
      },
      groups(groups = defaultState.groups, action) {
        return groups
      },
      users(users = defaultState.users, action) {
        return users
      },
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for ( let saga in sagas ) {
  sagaMiddleware.run(sagas[saga])
}


function updateOneTask(tasks, task, index) {
  return [
    ...tasks.slice(0, index),
    task,
    ...tasks.slice(index + 1)
  ]
}
