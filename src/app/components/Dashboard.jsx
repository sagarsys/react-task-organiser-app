import React from 'react'
import { connect } from 'react-redux'
import { ConnectedTaskList } from './TaskList'
import { Layout, Row } from 'antd'

export const Dashboard = ({ groups }) => (
  <Layout>
    <Row gutter={16}>
      {groups.map((group) => (
        <ConnectedTaskList id={group.id} name={group.name} key={group.id} />
      ))}
    </Row>
  </Layout>
)

const mapStateToProps = (state) => ({
  groups: state.groups,
})

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard)
