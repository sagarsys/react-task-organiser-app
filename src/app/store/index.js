import { applyMiddleware, combineReducers, createStore } from 'redux'
import { defaultState } from '../../server/default-state'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as sagas from './sagas.mock'
import * as mutations from './mutations'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({
      tasks(tasks = defaultState.tasks, action) {
        switch ( action.type ) {
          case mutations.CREATE_TASK:
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
