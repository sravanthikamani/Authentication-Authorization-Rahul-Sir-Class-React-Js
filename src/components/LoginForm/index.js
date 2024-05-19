import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  /* 3. calling onSubmitSuccess 
  onSubmitSuccess= () =>{} 
  Now in this function. what we have to write? if login is success it should navigate to home route.How it will navigate ?
  React router provides some histroy objects which has some methods to controls the navigation in tbhe browser.This history object has so many methods.
  We use push and replace methods from those. Now how we will get the history object ? through  react props we get.Write const {history} = this.props */
  onSubmitSuccess = () => {
    const {history} = this.props
    // history.push("/")  here we are navigating to home route.after navigating to that page, In the browser if we click on the back <- button, it will navigate to previous page. To avoid this. we write the statement replace
    history.replace('/')
  }
  /* 2. calling loginSubmitForm 
  Making authentication request to login API */

  loginSubmitForm = async event => {
    event.preventDefault() /* this statement is given bcoz when we submit form some default actions are performed. So to prevent them we give this statement */
    /* Now lets think when we submit form what happens 1.request is sent through api .For sending request what fields we need? username and password. username and password ni state nundi thechukuntam */
    const {username, password} = this.state
    /* now storing these username and password */
    const userDetails = {username, password}
    /* Now sending request through url. To send request we need url,options */
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST' /* for sending request we use POST */,
      body: JSON.stringify(
        userDetails,
      ) /* y we use body? we are sending username and password as an object. So through body we send this */,
    }
    /* Getting server Response. How we have to get server response:fetching url and options->storing the response.json object in data  */
    const response = await fetch(url, options) /* Fetching the details */
    const data = await response.json() /* storing the response */
    console.log(
      response,
    ) /* at this statement u check the output. In the console you will see ok:true if response is correctly executed */
    console.log(
      data,
    ) /* Checking the output whether response is getting or not */
    /* Now write the condition for login success or fail. For that we use response.ok */
    if (response.ok === true) {
      this.onSubmitSuccess() // Now write onSUbmitSUccess function
    }
  }

  render() {
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.loginSubmitForm}>
          (/*1.giving onSubmit here*/)
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
