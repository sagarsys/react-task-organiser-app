import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as mutations from '../store/mutations'
import { Button, Input, Select } from 'antd'

const { Option } = Select

const TaskDetail = ({
  id,
  comments,
  groups,
  task,
  isComplete,
  setTaskStatus,
  setTaskGroup,
  setTaskName,
}) => (
  <div>
    <div>
      <Input
        value={task.name}
        onChange={({ target: { value } }) => setTaskName(id, value)}
      />
    </div>
    <div>
      <Button onClick={() => setTaskStatus(id, !isComplete)}>
        {isComplete ? 'Reopen' : 'Complete'}
      </Button>
    </div>
    <div>
      <Select
        defaultValue={task.group}
        style={{ width: 120 }}
        onChange={(groupId) => setTaskGroup(id, groupId)}
      >
        {groups.map((group) => (
          <Option value={group.id} key={group.id}>
            {group.name}
          </Option>
        ))}
      </Select>
    </div>
    <div>
      <Link to="/dashboard">
        <Button type="link">Done</Button>
      </Link>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const { tasks, groups } = state
  const task = tasks.find((t) => t.id === id)
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTaskStatus(id, isComplete) {
      dispatch(mutations.setTaskStatus(id, isComplete))
    },
    setTaskGroup(id, groupId) {
      dispatch(mutations.setTaskGroup(id, groupId))
    },
    setTaskName(id, name) {
      dispatch(mutations.setTaskName(id, name))
    },
  }
}

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail)
