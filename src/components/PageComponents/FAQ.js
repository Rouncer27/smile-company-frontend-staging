import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import { B1CharcoalGrey, H4DarkPurple, colors } from "../../styles/helpers"

const FAQ = ({ faq }) => {
  const answerContainer = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [answerHeight, setAnswerHeight] = useState(0)

  useEffect(() => {
    console.timeLog(
      "HERE IS INSIDE USE EFFECT:",
      answerContainer.current.offsetHeight
    )
    console.dir(answerContainer.current)
    setAnswerHeight(answerContainer.current.offsetHeight)
  }, [])

  const handleChangeActiveFaq = () => {
    setIsActive(!isActive)
  }

  return (
    <FAQStyled faq={faq} isactive={isActive} answerheight={answerHeight}>
      <div className="question">
        <h3>{faq.question}</h3>
      </div>
      <div
        ref={answerContainer}
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
  padding-bottom: ${props =>
    props.isactive ? props.answerheight + 100 + "px" : "2rem"};
  border-bottom: solid 0.2rem ${colors.colorSecondary};
  background: ${props => (props.isactive ? colors.colorShad : colors.white)};
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    padding-bottom: ${props =>
      props.isactive ? props.answerheight + 15 + "px" : "2rem"};
  }

  .question {
    width: 100%;
    padding-right: 4rem;

    h3 {
      ${H4DarkPurple};
    }
  }

  .answer {
    position: absolute;
    top: 10rem;
    right: 3rem;
    left: 3rem;
    width: calc(100% - 12rem);
    transition: all 0.3s ease-out;
    visibility: ${props => (props.isactive ? "visible" : "hidden")};
    opacity: ${props => (props.isactive ? 1 : 0)};

    @media (min-width: 768px) {
      top: 7rem;
    }

    p,
    a {
      ${B1CharcoalGrey};
    }

    a:hover {
      color: ${colors.colorSecondary};
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
