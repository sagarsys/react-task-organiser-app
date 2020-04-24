import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const TaskDetail = ({ id, comments, groups, task, isComplete }) => (
    <div>
      <div>
        <input value={task.name}/>
      </div>
      <div>
        <button>Toggle completion</button>
      </div>
      <div>
        <select>
          {groups.map(group => (<option value={group.id} key={group.id}>{group.name}</option>))}
        </select>
      </div>
      <div>
        <Link to="/dashboard">
          <button>Done</button>
        </Link>
      </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const { tasks, groups, isComplete } = state
  const task = tasks.find(t => t.id === id)
  return {
    id, task, groups, isComplete
  }
}

export const ConnectedTaskDetail = connect(mapStateToProps)(TaskDetail)
