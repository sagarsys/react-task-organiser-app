import React, { useState } from 'react'
import { connect } from 'react-redux'
import { requestTaskCreation } from '../store/mutations'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Input } from 'antd'

const { TextArea } = Input

export const TaskList = ({ tasks, name, id, createNewTask }) => {
  const [newTaskName, setNewTaskName] = useState('')
  const onAddTask = () => {
    createNewTask(id, newTaskName)
    setNewTaskName('')
  }
  return (
    <Col span={8}>
      <Card
        title={name}
        actions={[
          <Button type="primary" onClick={onAddTask}>
            Add task
          </Button>,
        ]}
      >
        {tasks.map((task) => (
          <Link to={`/task/${task.id}`} key={task.id}>
            <div>{task.name}</div>
          </Link>
        ))}
        <TextArea
          autoSize
          value={newTaskName}
          placeholder="Enter task name"
          className="mt-1"
          onChange={({ target: { value } }) => setNewTaskName(value)}
        />
      </Card>
    </Col>
  )
}
const mapStateToProps = (state, ownProps) => {
  const { id, name } = ownProps
  return {
    name,
    id,
    tasks: state.tasks.filter((task) => task.group === id),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask: (id, name) => {
      if (!name) return
      console.log('Creating new task', id)
      dispatch(requestTaskCreation(id, name))
    },
  }
}

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)
