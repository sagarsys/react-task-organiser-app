import React from 'react'
import { connect } from 'react-redux'
import { requestTaskCreation } from '../store/mutations'
import { Link } from 'react-router-dom'

export const TaskList = ({ tasks, name, id, createNewTask }) => (
    <div>
      <h3>{name}</h3>
      <div>
        {tasks.map(task => (
            <Link to={`/task/${task.id}`} key={task.id}>
              <div>{task.name}</div>
            </Link>
        ))}
      </div>
      <button onClick={() => createNewTask(id)}>New task</button>
    </div>
);

const mapStateToProps = (state, ownProps) => {
  const { id, name } = ownProps;
  return {
    name,
    id,
    tasks: state.tasks.filter(task => task.group === id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask: (id) => {
      console.log('Creating new task', id)
      dispatch(requestTaskCreation(id))
    }
  }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList)
