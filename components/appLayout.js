import React from 'react'
import NavBar from '../components/navbar';

export default class extends React.Component {
  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired,
      children: React.PropTypes.object.isRequired,
    }
  }

  constructor(props) {
    super(props)
  }

  render () {
    const {children} = this.props
    return <div>
      <NavBar {...this.props}/>
      {children}
    </div>
  }
}
