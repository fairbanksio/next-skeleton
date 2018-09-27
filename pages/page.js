import React from 'react'
import Layout from '../components/appLayout'
import Page from '../components/page'


export default class extends Page {
  static async getInitialProps ({ req, query: { id } }) {
    let props = await super.getInitialProps({req})
    props.id = id
    return props
  }

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <Layout {...this.props}>
        <div>
          <i className="fas fa-2x fa-file-alt"></i>
          <h1>My {this.props.id} page</h1>
          <p>
            If requested recently, this page was pulled from cache.
          </p>
          <p>
            Otherwise, the newly rendered page was served and then cached for the next user.
          </p>
        </div>
      </Layout>
    )
  }
}
