import React from 'react'
import Router from 'next/router'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      session: this.props.session,
      providers: this.props.providers,
      submitting: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)

  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value.trim()
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.state.email) return

    this.setState({
      submitting: true
    })

    // Save current URL so user is redirected back here after signing in
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })

    NextAuth.signin(this.state.email)
    .then(() => {
      Router.push(`/auth/check-email?email=${this.state.email}`)
    })
    .catch(err => {
      Router.push(`/auth/error?action=signin&type=email&email=${this.state.email}`)
    })
  }

  render() {
    if (this.props.session.user) {
      return(<div/>)
    } else {
      return (
        <React.Fragment>
          <p className="text-center" style={{marginTop: 10, marginBottom: 30}}>{`If you don't have an account, one will be created when you sign in.`}</p>

            <SignInButtons providers={this.props.providers}/>

            <form id="signin" method="post" action="/auth/email/signin" onSubmit={this.handleSubmit}>
              <Input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>
              <p>
                <InputLabel htmlFor="email">Email address</InputLabel><br/>
                <Input name="email" disabled={this.state.submitting} type="text" placeholder="j.smith@example.com" id="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
              </p>
              <p className="text-right">
                <Button id="submitButton" disabled={this.state.submitting} outline color="dark" type="submit">
                  {this.state.submitting === true && <span className="icon icon-spin ion-md-refresh mr-2"/>}
                  Sign in with email
                </Button>
              </p>
            </form>

        </React.Fragment>
      )
    }
  }
}

export class SignInButtons extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          Object.keys(this.props.providers).map((provider, i) => {
            if (!this.props.providers[provider].signin) return null

            return (
              <p key={i}>
                <a className="btn btn-block btn-outline-secondary" href={this.props.providers[provider].signin}>
                  Sign in with {provider}
                </a>
              </p>
              )
          })
        }
      </React.Fragment>
    )
  }
}
