import React, { useContext } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { UserContext } from "../context/UserContext"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  console.log("PRIVATE ROUTE.....")
  const [state, dispatch] = useContext(UserContext)

  if (state.token === "" && location.pathname !== `/app/login`) {
    navigate(`/app/login`)
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
