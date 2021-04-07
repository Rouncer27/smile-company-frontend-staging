import React, { useState } from "react"
import MobileNavButton from "./MobileNavButton"
import MobileNavDrawer from "./MobileNavDrawer"

const MobileNav = ({ isapp }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      {!isapp && (
        <MobileNavButton toggleDrawer={handleToggleDrawer} isOpen={isOpen} />
      )}
      <MobileNavDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default MobileNav
