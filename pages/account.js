import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { NextAuth } from 'next-auth/client'
import Page from '../components/page'
import Layout from '../components/appLayout'
import Cookies from 'universal-cookie'

export default class extends Page {

  static async getInitialProps({req}) {
    let props = await super.getInitialProps({req})
    props.linkedAccounts = await NextAuth.linked({req})
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
      session: props.session,
      isSignedIn: (props.session.user) ? true : false,
      name: '',
      email: '',
      emailVerified: false,
      alertText: null,
      alertStyle: null
    }
    if (props.session.user) {
      this.state.name = props.session.user.name
      this.state.email = props.session.user.email
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    const session = await NextAuth.init({force: true})
    this.setState({
      session: session,
      isSignedIn: (session.user) ? true : false
    })

    // If the user bounces off to link/unlink their account we want them to
    // land back here after signing in with the other service / unlinking.
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })

    this.getProfile()
  }

  getProfile() {
    fetch('/account/user', {
      credentials: 'include'
    })
    .then(r => r.json())
    .then(user => {
      if (!user.name || !user.email) return
      this.setState({
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified
      })
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async onSubmit(e) {
    // Submits the URL encoded form without causing a page reload
    e.preventDefault()

    this.setState({
      alertText: null,
      alertStyle: null
    })

    const formData = {
      _csrf: await NextAuth.csrfToken(),
      name: this.state.name || '',
      email: this.state.email || ''
    }

    // URL encode form
    // Note: This uses a x-www-form-urlencoded rather than sending JSON so that
    // the form also in browsers without JavaScript
    const encodedForm = Object.keys(formData).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
    }).join('&')

    fetch('/account/user', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodedForm
    })
    .then(async res => {
      if (res.status === 200) {
        this.getProfile()
        this.setState({
          alertText: 'Changes to your profile have been saved',
          alertStyle: 'alert-success',
        })
        // Force update session so that changes to name or email are reflected
        // immediately in the navbar (as we pass our session to it).
        this.setState({
          session: await NextAuth.init({force: true}), // Update session data
        })
      } else {
        this.setState({
          session: await NextAuth.init({force: true}), // Update session data
          alertText: 'Failed to save changes to your profile',
          alertStyle: 'alert-danger',
        })
      }
    })
  }

  render() {
    if (this.state.isSignedIn === true) {
      const alert = (this.state.alertText === null) ? <div/> : <div className={`alert ${this.state.alertStyle}`} role="alert">{this.state.alertText}</div>

      return (
        <Layout {...this.props}>
          <h1 className="display-2">Your Account</h1>
          <p className="lead text-muted">
            Edit your profile and link accounts
          </p>

          {alert}
          <form method="post" action="/account/user" onSubmit={this.onSubmit}>
            <Input name="_csrf" type="hidden" value={this.state.session.csrfToken} onChange={()=>{}}/>
            <FormControl>
              <InputLabel>Name:</InputLabel>

                <Input name="name" value={this.state.name} onChange={this.handleChange}/>

            </FormControl>
            <FormControl>
              <InputLabel>Email:</InputLabel>

                <Input name="email" value={(this.state.email.match(/.*@localhost\.localdomain$/)) ? '' : this.state.email} onChange={this.handleChange}/>

            </FormControl>
            <FormControl>
              <p className="text-right">
                <Button color="primary" type="submit">Save Changes</Button>
              </p>
            </FormControl>
          </form>

          <LinkAccounts
            session={this.props.session}
            linkedAccounts={this.props.linkedAccounts}
            />

            <h2>Delete your account</h2>
            <p>
              If you delete your account it will be erased immediately.
              You can sign up again at any time.
            </p>
            <form id="signout" method="post" action="/account/delete">
              <Input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>
              <Button type="submit"><span className="icon ion-md-trash mr-1"></span> Delete Account</Button>
            </form>

        </Layout>
      )
    } else {
      return (
        <Layout {...this.props} navmenu={false}>
          <p className="lead m-0">
            <Link href="/signin"><a>Sign in to manage your profile</a></Link>
          </p>
        </Layout>
      )
    }
  }
}

export class LinkAccounts extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          Object.keys(this.props.linkedAccounts).map((provider, i) => {
            return <LinkAccount key={i} provider={provider} session={this.props.session} linked={this.props.linkedAccounts[provider]}/>
          })
        }
      </React.Fragment>
    )
  }
}

export class LinkAccount extends React.Component {
  render() {
    if (this.props.linked === true) {
      return (
        <form method="post" action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`}>
          <Input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
          <p>
            <button type="submit">
              Unlink from {this.props.provider}
            </button>
          </p>
        </form>
      )
    } else {
      return (
        <p>
          <a className="btn btn-block btn-outline-primary" href={`/auth/oauth/${this.props.provider.toLowerCase()}`}>
            Link with {this.props.provider}
          </a>
        </p>
      )
    }
  }
}
