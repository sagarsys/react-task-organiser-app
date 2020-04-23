import React from 'react'
import { connect } from 'react-redux'

export const TaskList = ({ tasks, name }) => (
    <div>
      <h3>{name}</h3>
      <div>
        {tasks.map(task => (<div key={task.id}>{task.name}</div>))}
      </div>
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

export const ConnectedTaskList = connect(mapStateToProps)(TaskList)
