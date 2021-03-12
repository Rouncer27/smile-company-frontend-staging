import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import {
  H1DarkPurple,
  H4Lavender,
  medWrapper,
  B1White,
  colors,
} from "../../styles/helpers"

const TeamCards = ({ data }) => {
  return (
    <TeamCardsSection>
      <div className="wrapper">
        <div className="teamTitle">
          <h2>{data.mainTitle}</h2>
          <h3>{data.subTitle}</h3>
        </div>
        <div className="teamCards">
          {data.teamCards.map((team, index) => {
            return (
              <Card key={index}>
                <div className="cardTitle">
                  <h3>{team.name}</h3>
                  <p>{team.position}</p>
                </div>
                <div className="cardImage">
                  <Img
                    fluid={team.image.localFile.childImageSharp.fluid}
                    alt={team.name}
                  />
                </div>
                <div className="cardBio">
                  <div dangerouslySetInnerHTML={{ __html: team.bio }} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </TeamCardsSection>
  )
}

const TeamCardsSection = styled.section`
  .wrapper {
    ${medWrapper};

    @media (max-width: 767px) {
      max-width: 50rem;
    }
  }

  .teamTitle {
    width: 100%;

    @media (min-width: 768px) {
      width: calc(33.33% - 2rem);
      margin-right: 2rem;
    }

    h2 {
      ${H1DarkPurple};
    }

    h3 {
      ${H4Lavender};
    }
  }

  .teamCards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    @media (min-width: 768px) {
      width: calc(66.66%);
    }
  }
`

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 2rem 1rem;

  @media (min-width: 768px) {
    width: calc(50% - 2rem);
    margin: 0 1rem;
  }

  .cardTitle {
    width: 100%;
    background-color: ${colors.colorAlt};
    padding: 3.5rem;
    text-align: center;

    h3 {
      ${H4Lavender};
      margin: 0;
    }

    p {
      ${B1White};
      margin: 0;
    }
  }

  .cardImage {
    width: 100%;
  }

  .cardBio {
    flex-grow: 1;
    width: 100%;
    background-color: ${colors.colorSecondary};
    padding: 3.5rem;

    p {
      ${B1White};
    }
  }
`

export default TeamCards
