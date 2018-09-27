import React from 'react'
import Layout from '../components/appLayout'
import Page from '../components/page'

export default class Error extends Page {
  static async getInitialProps({ req,res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    let props = await super.getInitialProps({req})
    props.statusCode = statusCode
    return props
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout {...this.props}>
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
      </Layout>
    )
  }
}
