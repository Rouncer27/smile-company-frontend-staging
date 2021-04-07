import React, { useEffect } from "react"
import { navigate } from "gatsby"

import NotFound from "./PageComponents/NotFound"

const NotFoundPage = () => {
  useEffect(() => {
    navigate(`/login`)
  })

  return <NotFound />
}

export default NotFoundPage
