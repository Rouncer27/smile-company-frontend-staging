import React from "react"
import styled from "styled-components"
import { B1CharcoalGrey } from "../../../../styles/helpers"

const ProfileNotFound = () => {
  return (
    <ProfileNotFoundStyled>
      <p>
        Sorry but this candidate's profile is no longer found. They might have
        deactivated their account or have requested to be removed form the app.
        Either way this candidate's information is not longer active.
      </p>
    </ProfileNotFoundStyled>
  )
}

const ProfileNotFoundStyled = styled.div`
  p {
    ${B1CharcoalGrey};
  }
`

export default ProfileNotFound
