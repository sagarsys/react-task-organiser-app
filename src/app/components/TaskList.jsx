import React from 'react'
import { connect } from 'react-redux'
import { requestTaskCreation } from '../store/mutations'
import { Link } from 'react-router-dom'
import { Button, Card, Col } from 'antd'

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <Col span={8}>
    <Card title={name}>
      {tasks.map((task) => (
        <Link to={`/task/${task.id}`} key={task.id}>
          <div>{task.name}</div>
        </Link>
      ))}
      <Button className="mt-1" type="primary" onClick={() => createNewTask(id)}>
        New task
      </Button>
    </Card>
  </Col>
)

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
    createNewTask: (id) => {
      console.log('Creating new task', id)
      dispatch(requestTaskCreation(id))
    },
  }
}

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)
