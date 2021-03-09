import React from "react"
import styled from "styled-components"

// Common styles
import mainSection from "./style/mainSection"
import dashWrap from "./style/dashWrap"

const MainHistory = () => {
  return (
    <MainHistoryStyled>
      <div className="dashWrap">
        <h2>Main History</h2>
      </div>
    </MainHistoryStyled>
  )
}

const MainHistoryStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }
`

export default MainHistory
