import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import SignUpForm from './components/SignUpForm'
import Home from './components/Home'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/SignUp" component={SignUpForm} />
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
