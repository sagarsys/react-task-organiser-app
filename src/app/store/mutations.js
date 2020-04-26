export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION'
export const CREATE_TASK = 'CREATE_TASK'
export const SET_TASK_STATUS = 'SET_TASK_STATUS'
export const SET_TASK_GROUP = 'SET_TASK_GROUP'
export const SET_TASK_NAME = 'SET_TASK_NAME'
export const REQUEST_USER_AUTHENTICATION = 'REQUEST_USER_AUTHENTICATION'
export const SET_USER_AUTHENTICATION_STATUS = 'SET_USER_AUTHENTICATION_STATUS'
export const AUTHENTICATING = 'AUTHENTICATING'
export const AUTHENTICATED = 'AUTHENTICATED'
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
export const SET_APP_STATE = 'SET_APP_STATE'
export const REQUEST_ADD_COMMENT = 'REQUEST_ADD_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'

export const requestTaskCreation = (groupId, taskName) => ({
  type: REQUEST_TASK_CREATION,
  groupId,
  taskName,
})

export const createTask = (taskId, taskName, groupId, ownerId) => ({
  type: CREATE_TASK,
  taskId,
  taskName,
  groupId,
  ownerId,
})

export const setTaskStatus = (id, isComplete) => ({
  type: SET_TASK_STATUS,
  taskId: id,
  isComplete,
})

export const setTaskGroup = (id, groupId) => ({
  type: SET_TASK_GROUP,
  taskId: id,
  groupId,
})

export const setTaskName = (id, name) => ({
  type: SET_TASK_NAME,
  taskId: id,
  name,
})

export const requestUserAuthentication = (username, password) => ({
  type: REQUEST_USER_AUTHENTICATION,
  username,
  password,
})

export const setUserAuthenticationStatus = (
  status = AUTHENTICATING,
  session = null
) => ({
  type: SET_USER_AUTHENTICATION_STATUS,
  session,
  authenticated: status,
})

export const setAppState = (state = {}) => ({
  type: SET_APP_STATE,
  state,
})

export const requestAddComment = (task, comment) => ({
  type: REQUEST_ADD_COMMENT,
  task,
  comment,
})

export const createComment = (commentId, task, comment, owner) => ({
  type: CREATE_COMMENT,
  commentId,
  task,
  comment,
  owner,
})
