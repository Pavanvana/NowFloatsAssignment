import {Component} from 'react'

import {initializeApp} from 'firebase/app'

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

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

class SignUpForm extends Component {
  state = {
    userEmail: '',
    password: '',
    confirmPassword: '',
    showError: false,
  }

  onChangeUserMail = event => {
    this.setState({userEmail: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userEmail, password, confirmPassword} = this.state
    if (userEmail !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) {
        const {history} = this.props
        history.replace('/')
        await createUserWithEmailAndPassword(auth, userEmail, password)
      } else {
        this.setState({showError: true})
      }
    } else {
      this.setState({showError: true})
    }
  }

  render() {
    const {userEmail, password, confirmPassword, showError} = this.state
    return (
      <div className="login-container">
        <div className="login-and-form-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="heading">Registration Form</h1>
            <div className="input-container">
              <label className="label" htmlFor="username">
                Email
              </label>
              <input
                className="input"
                type="text"
                id="username"
                placeholder="Enter your mail"
                onChange={this.onChangeUserMail}
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
                placeholder="Enter your password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="confirm-password">
                CONFIRM PASSWORD
              </label>
              <input
                className="input"
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                onChange={this.onChangeConfirmPassword}
                value={confirmPassword}
              />
            </div>
            <button type="submit" className="login-button">
              Register
            </button>
            {showError && <p className="error-msg">Registration Failed!</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default SignUpForm
