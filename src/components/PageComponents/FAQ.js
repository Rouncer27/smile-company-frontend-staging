import React, { useState } from "react"
import styled from "styled-components"

import { B1CharcoalGrey, H4DarkPurple, colors } from "../../styles/helpers"

const FAQ = ({ faq }) => {
  const [isActive, setIsActive] = useState(false)

  const handleChangeActiveFaq = () => {
    setIsActive(!isActive)
  }

  return (
    <FAQStyled faq={faq} isactive={isActive}>
      <div className="question">
        <h3>{faq.question}</h3>
      </div>
      <div
        className="answer"
        dangerouslySetInnerHTML={{ __html: faq.answer }}
      />

      <div className="faqButton">
        <button onClick={handleChangeActiveFaq}>&#43;</button>
      </div>
    </FAQStyled>
  )
}

const FAQStyled = styled.div`
  position: relative;
  width: 100%;
  padding: 2rem 3rem;
  border-bottom: solid 0.2rem ${colors.colorSecondary};
  background: ${props => (props.isactive ? colors.colorShad : colors.white)};

  .question {
    width: 100%;

    h3 {
      ${H4DarkPurple};
    }
  }

  .answer {
    width: 100%;
    height: ${props => (props.isactive ? "auto" : "0px")};
    visibility: ${props => (props.isactive ? "visible" : "hidden")};
    opacity: ${props => (props.isactive ? 1 : 0)};

    p {
      ${B1CharcoalGrey};
    }
  }

  .faqButton {
    position: absolute;
    top: 2rem;
    right: 2rem;

    button {
      width: 5rem;
      height: 5rem;
      background: transparent;
      border: none;
      font-size: 3rem;
      font-weight: bold;

      &:hover {
        cursor: pointer;
      }

      &:focus {
        outline: none;
      }
    }
  }
`

export default FAQ
