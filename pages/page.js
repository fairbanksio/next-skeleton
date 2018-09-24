import React from 'react'

export default class extends React.Component {
  static getInitialProps ({ query: { id } }) {
    return { id }
  }

  render () {
    return (
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
    )
  }
}
