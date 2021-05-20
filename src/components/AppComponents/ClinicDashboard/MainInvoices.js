// NPM Packages
import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getProfile from "./actions/getProfile"
// Common styles
import mainSection from "./styles/mainSection"
import dashWrap from "./styles/dashWrap"
import dashTitle from "./styles/dashTitle"
import { Nav1CharcoalGrey } from "../../../styles/helpers"
import getDate from "./helper/getDate"

const MainInvoices = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const { invoices } = profile
  const userId = user.id

  const getUpToDateProfile = async () => {
    await getProfile(token, userId, dispatch)
  }

  useEffect(() => {
    getUpToDateProfile()
  }, [])

  return (
    <MainInvoicesStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {state.profile && state.profile.profile_satisfied && (
            <p>
              <span /> {state.profile && state.profile.clinic_name}
            </p>
          )}
          <h2>My Invoices</h2>
        </div>
        <div className="dashContent">
          <ul>
            {invoices.map(invoice => {
              const readableDate = getDate(invoice.createdAt)
              return (
                <li key={invoice.id}>
                  <Link to={`/app/clinic-dashboard/invoices/${invoice.id}`}>
                    <span>{readableDate}</span> &#124;{" "}
                    <span>{invoice.order_name}</span> &#124;{" "}
                    <span>{invoice.id}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </MainInvoicesStyled>
  )
}

const MainInvoicesStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }

  .dashTitle {
    ${dashTitle};
  }

  .dashContent {
    width: 100%;
    margin: 5rem auto;

    ul {
      width: 100%;

      li {
        width: 100%;
        margin-bottom: 1rem;
        padding: 1rem;
        border: 0.1rem solid rgba(0, 0, 0, 0.15);
        box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.25);

        a {
          ${Nav1CharcoalGrey};

          span {
            display: inline-block;
            padding: 0 2rem;
          }

          span:first-of-type {
            padding-left: 0;
          }
        }
      }
    }
  }
`

export default MainInvoices
