import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import styled from "styled-components"

import {
  H1DarkPurple,
  H2Lavender,
  H3CharcoalGrey,
  H4DarkPurple,
  B1CharcoalGrey,
  B2CharcoalGrey,
  Nav1Lavender,
  Nav1CharcoalGrey,
  standardWrapper,
  Btn1DarkPurple,
  Btn1LightSage,
} from "../styles/helpers"

const WrapperOne = styled.div`
  ${standardWrapper};
`

const HeadlineOne = styled.h1`
  ${H1DarkPurple};
`

const HeadlineTwo = styled.h2`
  ${H2Lavender};
`

const HeadlineThree = styled.h3`
  ${H3CharcoalGrey};
`

const HeadlineFour = styled.h4`
  ${H4DarkPurple};
`

const BodyOneBold = styled.p`
  ${B1CharcoalGrey};
  font-weight: bold;
`

const BodyOne = styled.p`
  ${B1CharcoalGrey};
`

const BodyTwo = styled.p`
  ${B2CharcoalGrey};
`

const NavOne = styled.li`
  ${Nav1Lavender};
`

const NavTwo = styled.li`
  ${Nav1CharcoalGrey};
`

const ButtonsDiv = styled.div`
  width: 100%;

  a,
  button {
    ${Btn1DarkPurple};
    margin-right: 4rem;
  }
`

const ButtonsTwoDiv = styled.div`
  width: 100%;
  margin-top: 5rem;

  a,
  button {
    ${Btn1LightSage};
    margin-right: 4rem;
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Smile and Copmany" />
    <WrapperOne>
      <HeadlineOne>Smile and Copmany</HeadlineOne>
      <HeadlineOne>H1 Lato - Aliquam tincidunt mauris eu risus.</HeadlineOne>
      <HeadlineTwo>H2 Lato - Aliquam tincidunt mauris eu risus.</HeadlineTwo>
      <HeadlineThree>
        H3 Lato - Aliquam tincidunt mauris eu risus.
      </HeadlineThree>
      <HeadlineFour>H4 Lora - Aliquam tincidunt mauris eu risus.</HeadlineFour>
      <BodyOneBold>
        B1 Lora BOLD - Sed egestas, ante et vulputate volutpat, eros pede semper
        est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus
        adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
        elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum
        volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar
        nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
        dapibus sed, urna.
      </BodyOneBold>
      <BodyOne>
        B1 Lora - Sed egestas, ante et vulputate volutpat, eros pede semper est,
        vitae luctus metus libero eu augue. Morbi purus libero, faucibus
        adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
        elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum
        volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar
        nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
        dapibus sed, urna.
      </BodyOne>
      <BodyTwo>
        B2 Lora - Sed egestas, ante et vulputate volutpat, eros pede semper est,
        vitae luctus metus libero eu augue. Morbi purus libero, faucibus
        adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
        elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum
        volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar
        nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et,
        dapibus sed, urna.
      </BodyTwo>
      <ul>
        <NavOne>Nav Lato</NavOne>
        <NavTwo>Nav Lato</NavTwo>
      </ul>
      <ButtonsDiv>
        <a href="#">Button</a>
        <button type="button">Button</button>
        <button disabled type="button">
          Button
        </button>
      </ButtonsDiv>
      <ButtonsTwoDiv>
        <a href="#">Button</a>
        <button type="button">Button</button>
        <button disabled type="button">
          Button
        </button>
      </ButtonsTwoDiv>
    </WrapperOne>
  </Layout>
)

export default IndexPage
