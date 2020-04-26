import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as mutations from '../store/mutations'
import { Button, Card, Input, Layout, Select, Space, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { ConnectedTaskComment } from './TaskComment'

const { TextArea } = Input
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
  <Layout>
    <Card
      title="Task details"
      className="w-100"
      actions={[
        <Link to="/dashboard">
          <Button type="link">Done</Button>
        </Link>,
      ]}
    >
      <Space direction="vertical" className="w-100">
        <TextArea
          autoSize
          value={task.name}
          onChange={({ target: { value } }) => setTaskName(id, value)}
        />
        <Space direction="horizontal">
          <Select
            defaultValue={task.group}
            style={{ width: 120, marginRight: 30 }}
            onChange={(groupId) => setTaskGroup(id, groupId)}
          >
            {groups.map((group) => (
              <Option value={group.id} key={group.id}>
                {group.name}
              </Option>
            ))}
          </Select>

          <label style={{ marginLeft: 15 }}>Completed</label>
          <Switch
            defaultChecked={isComplete}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onClick={() => setTaskStatus(id, !isComplete)}
          />
        </Space>
      </Space>
    </Card>
    <ConnectedTaskComment taskId={id} />
  </Layout>
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
