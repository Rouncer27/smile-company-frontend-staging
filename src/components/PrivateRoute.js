import React, { useContext } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { UserContext } from "../context/UserContext"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const [state] = useContext(UserContext)
  if (state.token === "") {
    navigate(`/login`)
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
