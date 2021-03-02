import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { globalHistory } from "@reach/router"
import {
  B1Sage,
  colors,
  H1DarkPurple,
  Nav1CharcoalGrey,
  H4DarkPurple,
  Btn1LightSage,
  H4CharcoalGrey,
  H2Lavender,
} from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"

const MainInvoiceSingle = () => {
  const [currentInvoiceId, setCurrentInvoiceId] = useState("")
  const [currentInvoice, setCurrentInvoice] = useState(null)
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const userId = user.id

  useEffect(() => {
    const urlSplit = globalHistory.location.pathname.split("/")
    const invoiceId = urlSplit[urlSplit.length - 1]
    setCurrentInvoiceId(invoiceId)
  }, [])

  useEffect(() => {
    const invoice = profile.invoices.find(
      invoice => invoice.id === currentInvoiceId
    )
    setCurrentInvoice(invoice)
  }, [currentInvoiceId])

  return (
    <MainInvoiceSingleStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {" "}
          {state.profile && state.profile.profile_satisfied && (
            <p>
              <span /> {state.profile && state.profile.clinic_name}
            </p>
          )}
          <h2>Invoice Details</h2>
        </div>
        {currentInvoice ? (
          <div className="dashContent">
            <div className="invoiceTitle">
              <h2>{currentInvoice.order_name}</h2>
              <p>{currentInvoice.clinic_name}</p>
              <p>Invoice was emailed to: {user.email}</p>
              <p>Invoice Number: {currentInvoice.id}</p>
              <p>Date Purchased: {currentInvoice.payment_date}</p>
              <p>Payment Method: {currentInvoice.payment_method}</p>
              <p>Order Status: {currentInvoice.payment_status}</p>
              {currentInvoice.order_month_subscription ? (
                <p>Monthly Subscription Active</p>
              ) : (
                <p>Credits Added: {currentInvoice.order_credits}</p>
              )}
            </div>

            <div className="bookDetail">
              <div className="bookDetail__title">
                <p>Item Detail</p>
              </div>
              <div className="bookDetail__price">
                <h2>{currentInvoice.order_name}</h2>
                <p>&#36; {currentInvoice.order_item_total}</p>
              </div>
              <div className="bookDetail__descriptions">
                <p className="bookDetail__descriptions--terms">
                  {currentInvoice.order_terms}
                </p>
                <p className="bookDetail__descriptions--description">
                  {currentInvoice.order_description}
                </p>
                <p className="bookDetail__descriptions--includes">
                  {currentInvoice.order_details}
                </p>
              </div>
            </div>

            <div className="paymentDetails">
              <div>
                <h2>Payment Details</h2>
              </div>
              <div>
                <p>
                  Sub Total: &#36;{currentInvoice.order_item_total.toFixed(2)}
                </p>
                <p>
                  Taxes (GST): &#36;{currentInvoice.order_tax_total.toFixed(2)}
                </p>
                <p>
                  Total Invoice Amount: &#36;
                  {currentInvoice.order_price_total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>
              Could not find that invoice details. Please try again later or
              contact Smile and Company to assist.
            </p>
          </div>
        )}
      </div>
    </MainInvoiceSingleStyled>
  )
}

const MainInvoiceSingleStyled = styled.div`
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

    .invoiceTitle {
      margin-bottom: 5rem;
      h2 {
        ${H2Lavender};
      }

      p {
        ${Nav1CharcoalGrey};
        margin: 0;
        margin-bottom: 1rem;

        &:hover {
          color: ${colors.colorAlt};
          cursor: inherit;
        }
      }
    }

    .bookDetail {
      margin-bottom: 5rem;

      &__title {
        p {
          ${H2Lavender};
          margin: 0;
        }
      }

      &__price {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding-bottom: 1rem;
        margin-bottom: 2rem;
        border-bottom: solid 2px ${colors.colorTertiary};

        h2 {
          ${H4DarkPurple};
          width: calc(90%);
          margin: 0;
        }

        p {
          ${H4DarkPurple};
          width: calc(10%);
          margin: 0;
        }
      }

      &__descriptions {
        border-bottom: solid 2px ${colors.colorSecondary};
        padding-bottom: 2rem;
        margin-bottom: 2rem;

        p {
          ${Nav1CharcoalGrey};
          margin: 0;

          &:hover {
            color: ${colors.colorAlt};
            cursor: inherit;
          }
        }

        p.bookDetail__descriptions--includes {
          margin-top: 3rem;
        }
      }
    }

    .paymentDetails {
      h2 {
        ${H2Lavender};
        margin: 0;
      }

      p {
        ${Nav1CharcoalGrey};
        margin: 0;
        margin-bottom: 1rem;

        &:hover {
          color: ${colors.colorAlt};
          cursor: inherit;
        }
      }
    }
  }
`

export default MainInvoiceSingle
