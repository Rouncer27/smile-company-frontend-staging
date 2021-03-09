import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import {
  B1Sage,
  colors,
  H1DarkPurple,
  Nav1CharcoalGrey,
} from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"
import { Link } from "gatsby"

import getProfile from "./actions/getProfile"

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
              return (
                <li key={invoice.id}>
                  <Link to={`/app/clinic-dashboard/invoices/${invoice.id}`}>
                    <span>{invoice.payment_date}</span> &#124;{" "}
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
  align-self: stretch;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    width: calc(70vw);
  }

  .dashWrap {
    width: calc(100% - 5rem);
    max-width: 80rem;
    margin-left: 5rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .dashTitle {
    width: 100%;

    h2 {
      ${H1DarkPurple};
      margin-top: 0;
    }

    p {
      ${B1Sage};
      margin-bottom: 0;
      font-weight: bold;
    }
  }

  .dashContent {
    width: 100%;
    margin: 5rem auto;

    ul {
      width: 100%;

      li {
        width: 100%;
        margin-bottom: 1rem;

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
