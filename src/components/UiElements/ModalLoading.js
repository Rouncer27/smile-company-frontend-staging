import React, { useContext } from "react"
import styled from "styled-components"
import Loader from "react-loader-spinner"
import { UserContext } from "../../context/UserContext"

const ModalLoading = () => {
  const [state] = useContext(UserContext)

  return (
    <LoadingModalStyled loadingactive={state.loading}>
      <div className="inner">
        <div>
          <Loader
            type="TailSpin"
            color="#ad89a6"
            secondaryColor="#8c9f8a"
            height={100}
            width={100}
          />
        </div>
      </div>
    </LoadingModalStyled>
  )
}

const LoadingModalStyled = styled.div`
  display: ${props => (props.loadingactive ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(107, 81, 109, 0.75);
  z-index: 99999999;
  opacity: ${props => (props.loadingactive ? 1 : 0)};
  visibility: ${props => (props.loadingactive ? "visible" : "hidden")};

  .inner {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 32rem;
    width: 50vw;
    min-height: 32rem;
    transform: translate(-50%, -50%);
  }
`

export default ModalLoading
