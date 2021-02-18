import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { B2White, H4Lavender, standardWrapper } from "../../styles/helpers"

import SocialMediaContainer from "../SocialMedia/SocialMediaContainer"

const getData = graphql`
  {
    siteWideData: wp {
      siteWideSettings {
        acfSiteWideSettings {
          socialMediaLinks {
            type
            url
          }
          contactEmailAddress
          contactPhoneNumber
        }
      }
    }
  }
`

const ContactBanner = ({ data }) => {
  const siteContent = useStaticQuery(getData)
  const emailAddress =
    siteContent.siteWideData.siteWideSettings.acfSiteWideSettings
      .contactEmailAddress
  const phoneNumber =
    siteContent.siteWideData.siteWideSettings.acfSiteWideSettings
      .contactPhoneNumber
  console.log(
    siteContent.siteWideData.siteWideSettings.acfSiteWideSettings
      .contactEmailAddress
  )

  const socialMediaLinks =
    siteContent.siteWideData.siteWideSettings.acfSiteWideSettings
      .socialMediaLinks
  return (
    <ContactBannerSection>
      <div className="wrapper">
        <div className="title">
          <h2>{data.title}</h2>
        </div>
        {(data.email || data.phone) && (
          <div className="contactInfo">
            {data.email && (
              <p>
                email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              </p>
            )}
            {data.phone && (
              <p>
                phone: <a href={`tel:+1${phoneNumber}`}>{phoneNumber}</a>
              </p>
            )}

            {data.socialShare && (
              <div className="socialInfo">
                <SocialMediaContainer socialMediaLinks={socialMediaLinks} />
              </div>
            )}
          </div>
        )}
      </div>
    </ContactBannerSection>
  )
}

const ContactBannerSection = styled.section`
  background-color: rgba(47, 43, 49, 0.9);

  .wrapper {
    ${standardWrapper};
  }

  .title {
    width: 100%;
    text-align: center;

    h2 {
      ${H4Lavender};
    }
  }

  .contactInfo {
    width: 100%;
    text-align: center;

    p,
    a {
      ${B2White};
      margin: 0;
    }
  }

  .socialInfo {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 3rem auto;

    @media (min-width: 768px) {
      width: calc(20%);
      text-align: center;
    }
  }
`

export default ContactBanner
