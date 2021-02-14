import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import {
  B1CharcoalGrey,
  Btn1DarkPurple,
  H1DarkPurple,
  medWrapper,
  Nav1CharcoalGrey,
} from "../../styles/helpers"

import Tooth from "../Icons/Tooth"

const getData = graphql`
  {
    testimonials: allWpTestimonial {
      edges {
        node {
          title
          acfTestimonials {
            sacContent
            fieldGroupName
          }
        }
      }
    }
  }
`

const Testimonials = () => {
  const data = useStaticQuery(getData)
  const cards = data.testimonials.edges

  const [activeCardsIndex, setActiveCardsIndex] = useState(1)
  const [totalCards, setTotalCards] = useState(0)
  const [disableNav, setDisabledNav] = useState(false)

  useEffect(() => {
    setTotalCards(cards.length)
  }, [cards.length])

  const handleDisableNav = () => {
    setDisabledNav(true)
    setTimeout(() => {
      setDisabledNav(false)
    }, 600)
  }

  const handleOnNextSlide = () => {
    handleDisableNav()

    if (totalCards - 1 > activeCardsIndex) {
      setActiveCardsIndex(activeCardsIndex + 1)
    }

    if (totalCards - 1 <= activeCardsIndex) {
      setActiveCardsIndex(0)
    }
  }

  const handleOnPrevSlide = () => {
    handleDisableNav()

    if (activeCardsIndex !== 0) {
      setActiveCardsIndex(activeCardsIndex - 1)
    }

    if (activeCardsIndex === 0) {
      setActiveCardsIndex(totalCards - 1)
    }
  }
  return (
    <TestSection>
      <div className="wrapper">
        <div className="testTitle">
          <h2>Kind Words from our Clients</h2>
        </div>
        <div className="slider">
          {cards.map((test, index) => {
            let zeroCard
            let firstCard
            let secondCard
            let thirdCard
            let fourthCard
            if (activeCardsIndex === 0) {
              zeroCard = totalCards - 2
              firstCard = totalCards - 1
              secondCard = activeCardsIndex
              thirdCard = activeCardsIndex + 1
              fourthCard = activeCardsIndex + 2
            } else if (activeCardsIndex === 1) {
              zeroCard = totalCards - 1
              firstCard = 0
              secondCard = activeCardsIndex
              thirdCard = activeCardsIndex + 1
              fourthCard = activeCardsIndex + 2
            } else if (activeCardsIndex === totalCards - 1) {
              zeroCard = activeCardsIndex - 2
              firstCard = activeCardsIndex - 1
              secondCard = activeCardsIndex
              thirdCard = 0
              fourthCard = 1
            } else if (activeCardsIndex === totalCards - 2) {
              zeroCard = activeCardsIndex - 2
              firstCard = activeCardsIndex - 1
              secondCard = activeCardsIndex
              thirdCard = activeCardsIndex + 1
              fourthCard = 0
            } else {
              zeroCard = activeCardsIndex - 2
              firstCard = activeCardsIndex - 1
              secondCard = activeCardsIndex
              thirdCard = activeCardsIndex + 1
              fourthCard = activeCardsIndex + 2
            }

            const cardActive =
              index === firstCard
                ? true
                : index === secondCard
                ? true
                : index === thirdCard
                ? true
                : false

            const leftOffScreen = index === zeroCard
            const leftCard = index === firstCard
            const centerCard = index === secondCard
            const rightCard = index === thirdCard
            const rightOffScreen = index === fourthCard

            return (
              <Card
                className="slideContent"
                data-index={index}
                cardindex={index}
                activecardindex={activeCardsIndex}
                cardactive={cardActive}
                leftoff={leftOffScreen}
                leftcard={leftCard}
                centercard={centerCard}
                rightcard={rightCard}
                rightoff={rightOffScreen}
                key={index}
              >
                <div className="slideContent__wrapper">
                  <div className="slideContent__icon">
                    <Tooth />
                  </div>
                  <div className="slideContent__name">
                    <h3>{test.node.title}</h3>
                  </div>
                  <div
                    className="slideContent__content"
                    dangerouslySetInnerHTML={{
                      __html: test.node.acfTestimonials.sacContent,
                    }}
                  />
                </div>
              </Card>
            )
          })}
          <div className="sliderNav">
            <button
              disabled={disableNav}
              onClick={() => {
                handleOnNextSlide()
              }}
              className="sliderNav__button sliderNav__next"
              type="button"
            >
              Next
            </button>
            <button
              disabled={disableNav}
              onClick={() => {
                handleOnPrevSlide()
              }}
              className="sliderNav__button sliderNav__prev"
              type="button"
            >
              Prev
            </button>
          </div>
        </div>
      </div>
    </TestSection>
  )
}

const TestSection = styled.section`
  position: relative;
  padding: 5rem 0;

  .wrapper {
    ${medWrapper};
    max-width: 100% !important;
  }

  .testTitle {
    width: 100%;
    margin: 0 auto 8.5rem;
    text-align: center;

    @media (min-width: 768px) {
    }

    h2 {
      ${H1DarkPurple};
      width: 100%;
    }
  }

  .slider {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
    height: 40rem;

    @media (min-width: 768px) {
      height: 60rem;
    }

    @media (min-width: 1025px) {
      height: 55rem;
    }
  }

  .sliderNav {
    &__button {
      ${Btn1DarkPurple};
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 99999999999;
    }

    &__next {
      left: 0rem;
    }

    &__prev {
      right: 0rem;
    }
  }
`

const Card = styled.div`
  ${"" /* ${props => console.log(props)}; */}
  position: absolute;

  top: 0;
  right: auto;
  left: 50%;
  bottom: 0;
  transform: ${props =>
    props.centercard ? "translate(-50%, -5rem)" : "translate( -50%, 20rem)"};
  transition: all 0.5s ease-in;

  align-items: center;
  background-color: ${props =>
    props.centercard ? "rgba(173,137,166,1)" : "rgba(173,137,166,0.25)"};
  width: calc(100%);
  padding: 2rem 4rem;
  z-index: ${props => (props.centercard ? "999999" : "5")};
  ${props =>
    props.centercard ? "box-shadow: 3px 4px 7px 0 rgba(0, 0, 0, 0.16);" : ""};
  opacity: ${props => (props.cardactive && props.centercard ? "1" : "0")};

  @media (min-width: 768px) {
    width: calc(33.33%);
    right: ${props => (props.rightcard ? "10rem" : "auto")};
    left: ${props =>
      props.leftcard ? "10rem" : props.centercard ? "50%" : "auto"};
    ${props => props.rightoff && "right: 25rem"};
    ${props => props.leftoff && "left: 25rem"};
    padding: 8rem 4rem;
    transform: ${props =>
      props.centercard ? "translate( -50%, -5rem)" : "translateX(0%)"};
    opacity: ${props => (props.cardactive ? "1" : "0")};
  }

  .slideContent__icon {
    width: 10rem;
    margin: auto;
  }

  .slideContent__name {
    width: 100%;
    margin: 2rem auto 4rem;

    h3 {
      ${Nav1CharcoalGrey};
      text-align: center;
    }
  }

  p {
    ${B1CharcoalGrey};
    text-align: center;
  }
`

export default Testimonials
