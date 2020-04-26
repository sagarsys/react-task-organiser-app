import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Comment, Input } from 'antd'
import * as mutations from '../store/mutations'

const { TextArea } = Input

export const TaskComment = ({ comments, requestAddComment }) => {
  const [comment, setComment] = useState('')
  const addComment = (comment) => {
    requestAddComment(comment)
    setComment('')
  }
  return (
    <Card
      actions={[
        <Button type="primary" onClick={() => addComment(comment)}>
          Add comment
        </Button>,
      ]}
      size="small"
      title="Comments"
      className="w-100 mt-1"
    >
      {comments.length ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            author={comment.owner}
            content={comment.content}
          />
        ))
      ) : (
        <p>No comments yet</p>
      )}
      <TextArea
        autoSize
        value={comment}
        placeholder="Enter comment here"
        onChange={({ target: { value } }) => setComment(value)}
      />
    </Card>
  )
}
const mapStateToProps = (state, ownProps) => {
  const { taskId, comments } = ownProps
  const taskComments = comments.filter((comment) => comment.task === taskId)
  const { users } = state
  const userComments = taskComments.map((comment) => {
    const userId = comment.owner
    const user = users.find((u) => u.id === userId)
    return {
      ...comment,
      owner: user.name,
    }
  })
  return {
    comments: userComments,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestAddComment: (comment) => {
    if (!comment) return
    const { taskId } = ownProps
    console.log('Add comment', { taskId, comment })
    dispatch(mutations.requestAddComment(taskId, comment))
  },
})

export const ConnectedTaskComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskComment)
