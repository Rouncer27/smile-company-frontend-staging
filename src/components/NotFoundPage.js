import React, { useEffect } from "react"
import { navigate } from "gatsby"

const NotFoundPage = () => {
  useEffect(() => {
    navigate(`/app/login`)
  })

  return (
    <div>
      <h2>Page not found</h2>
    </div>
  )
}

export default NotFoundPage
