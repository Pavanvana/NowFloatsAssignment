import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from './Auth'

const ProtectedRoute = props => {
  if (AuthContext === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default ProtectedRoute
