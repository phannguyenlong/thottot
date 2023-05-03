// externals
import React from 'react'
// internals
import Layout from '../components/Layout'
import withAuth from '../components/withAuth'
// styling
import sass from '../styles/sass/pages/branchesProfile.scss'

class BranchesProfile extends React.Component {
  render() {
    return (
      <Layout>
        <div className={sass.container}>
          <h1>Branches Profile</h1>
        </div>
      </Layout>
    )
  }
}

export default withAuth({ isWorker: true })(BranchesProfile)
