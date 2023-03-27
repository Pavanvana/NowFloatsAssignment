import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

import {initializeApp} from 'firebase/app'

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAo24XnwE3FZ-wEebWBHcybexTFpy1T7JQ',
  authDomain: 'social-media-app-2cf9d.firebaseapp.com',
  projectId: 'social-media-app-2cf9d',
  storageBucket: 'social-media-app-2cf9d.appspot.com',
  messagingSenderId: '964270741596',
  appId: '1:964270741596:web:a3451385762a32933f2e99',
  measurementId: 'G-6JY770YEYF',
})

const auth = getAuth(firebaseApp)

class LoginPage extends Component {
  state = {
    userEmail: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    try {
      const {history} = this.props
      const {userEmail, password} = this.state
      await signInWithEmailAndPassword(auth, userEmail, password)
      history.replace('/')
    } catch (e) {
      this.onSubmitFailure(e.message)
    }
  }

  onChangeUserEmail = event => {
    this.setState({userEmail: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {userEmail, password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-and-form-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="heading">Social Media</h1>
            <div className="input-container">
              <label className="label" htmlFor="username">
                Email
              </label>
              <input
                className="input"
                type="text"
                id="username"
                placeholder="Enter your mail "
                onChange={this.onChangeUserEmail}
                value={userEmail}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input"
                type="password"
                id="password"
                placeholder="Enter your Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="signup">
              Need an account?{' '}
              <Link className="link" to="/SignUp">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginPage
