import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { colors, H2White, Btn1LightSage, B2White } from "../../styles/helpers"

const JobPostSidebar = () => {
  return (
    <Sidebar className="postingSidebar">
      <div className="postingSidebar__title">
        <h3>Looking for temping opportunities</h3>
      </div>
      <div className="postingSidebar__content">
        <p>
          Sign up to be part of our Dental Professionals team for placement
          opportunities.
        </p>
      </div>
      <div className="postingSidebar__link">
        <Link to={`/how-it-works`}>How It Works</Link>
      </div>
    </Sidebar>
  )
}

const Sidebar = styled.div`
  align-self: flex-start;
  width: calc(100%);
  padding: 4rem 2rem;
  background-color: ${colors.greyMed};

  @media (min-width: 768px) {
    width: calc(33.33% - 1rem);
    margin-right: 1rem;
    padding: 4rem;
  }

  .postingSidebar__title {
    h3 {
      ${H2White};
    }
  }

  .postingSidebar__content {
    p {
      ${B2White};
    }
  }

  .postingSidebar__link {
    a {
      ${Btn1LightSage};
    }
  }
`

export default JobPostSidebar
