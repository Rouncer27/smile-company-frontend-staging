import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  B1CharcoalGrey,
  Btn1DarkPurple,
  H3CharcoalGrey,
} from "../../styles/helpers"

import Download from "../Icons/AppIcons/Download"
import MainLogo from "../Logo/MainLogo"

const ModalAddToHome = () => {
  const [isActive, toggleActive] = useState(false)

  useEffect(() => {
    const alreadyClickClose = localStorage.getItem("popupWarn")
    if (alreadyClickClose) return
    setTimeout(() => {
      toggleActive(true)
    }, 1000)
  }, [])

  return (
    <ModalAddToHomeStyled isActive={isActive} id="popupWarning">
      <div className="container">
        <div>
          <div className="mainPopupLogo">
            <MainLogo />
          </div>
          <h2>Smile and Company PWA App</h2>

          <div className="container__content">
            <p>
              Install this Progressive Web Application to your home screen for
              quick and easy access when you’re on the go.
            </p>
            <p>
              Just tap{" "}
              <span>
                <Download />
              </span>{" "}
              then 'Add to home Screen'
            </p>
          </div>
          <div className="container__button">
            <button
              onClick={() => {
                toggleActive(false)
                localStorage.setItem("popupWarn", true)
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </ModalAddToHomeStyled>
  )
}

const ModalAddToHomeStyled = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 999999999;
  transition: all 0.3 ease;
  opacity: ${props => (props.isActive ? 1 : 0)};
  visibility: ${props => (props.isActive ? "visable" : "hidden")};

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 70rem;
    padding: 4rem;
    margin: auto;
    background-color: rgba(255, 255, 255, 1);
    border: 1.5rem solid #6b516d;
    transform: translate(-50%, -50%);

    .mainPopupLogo {
      max-width: 30rem;
      margin: 0 auto 2rem;
    }

    h2 {
      ${H3CharcoalGrey};
      text-align: center;
    }

    &__content {
      text-align: center;

      p {
        ${B1CharcoalGrey};

        span {
          display: inline-block;
          width: 5rem;
          transform: translateY(1.25rem);
        }
      }
    }

    &__button {
      text-align: center;

      button {
        ${Btn1DarkPurple};
      }
    }
  }
`

export default ModalAddToHome
