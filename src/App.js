import './App.css'

import {Switch, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import SignUpForm from './components/SignUpForm'
import Home from './components/Home'
import MyProfile from './components/MyProfile'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/SignUp" component={SignUpForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/my-profile" component={MyProfile} />
  </Switch>
)

export default App
