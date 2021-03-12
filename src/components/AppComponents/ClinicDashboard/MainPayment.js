import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import queryString from "query-string"
import axios from "axios"
import { globalHistory } from "@reach/router"
import { UserContext } from "../../../context/UserContext"
import PaymentGateways from "./Payments/PaymentGateways"

import {
  B1Sage,
  colors,
  H1DarkPurple,
  H4DarkPurple,
  H4Lavender,
  Nav1CharcoalGrey,
  B1CharcoalGrey,
} from "../../../styles/helpers"
import Skeleton from "react-loading-skeleton"

const MainPayment = () => {
  const [termsAgree, setTermsAgree] = useState(false)
  const [productType, setProductType] = useState("")
  const [productDetails, setproductDetails] = useState({
    name: "",
    price: "",
    description: "",
    details: "",
    terms: "",
    active: false,
  })
  const [state, dispatch] = useContext(UserContext)
  const token = state.token

  const setOneBooking = data => {
    setproductDetails({
      name: "One Booking",
      qty: 1,
      price: data.booking_one_price,
      description: data.booking_one_description,
      details: data.booking_one_includes_details,
      terms: data.booking_one_purchase_terms,
      active: true,
    })
  }

  const setSmilePass = data => {
    setproductDetails({
      name: "10 Smile Pass",
      qty: 1,
      price: data.ten_pass_price,
      description: data.ten_pass_description,
      details: data.ten_pass_includes_details,
      terms: data.ten_pass_purchase_terms,
      active: true,
    })
  }

  const setMembership = data => {
    setproductDetails({
      name: "Monthly Membership",
      qty: 1,
      price: data.smile_member_price,
      description: data.smile_member_description,
      details: data.smile_member_included_details,
      terms: data.smile_member_purchase_terms,
      active: true,
    })
  }

  const setCancelFee = () => {
    setproductDetails({
      name: "Short Notice Cancellation Fee",
      qty: state.profile.number_of_short_fees,
      price: 50 * state.profile.number_of_short_fees,
      description:
        "Cancellation fee for requesting a short notice cancelling of a temp job booking.",
      details: "$50 Fee for each short notice cancellation",
      terms: "Must be paid before you can create any other bookings.",
      active: true,
    })
  }

  const getPackagesData = async () => {
    try {
      const reponse = await axios.get(
        `${process.env.GATSBY_API_URL}/booking-packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (productType === "onebooking") return setOneBooking(reponse.data)
      if (productType === "smilepass") return setSmilePass(reponse.data)
      if (productType === "membership") return setMembership(reponse.data)
      if (productType === "fee") return setCancelFee()
    } catch (err) {
      console.dir(err)
      const message =
        err.response.data &&
        err.response.data.message &&
        typeof err.response.data.message === "object"
          ? err.response.data.message[0] &&
            err.response.data.message[0].messages[0] &&
            err.response.data.message[0].messages[0].message
          : typeof err.response.data.message === "string"
          ? err.response.data.message
          : "Something went wrong. Please try again later"
      dispatch({ type: "USER_ERROR", payload: { message } })
    }
  }

  useEffect(() => {
    const queryData = queryString.parse(globalHistory.location.search)
    setProductType(queryData.product)
  }, [])

  useEffect(() => {
    getPackagesData()
  }, [productType])

  return (
    <MainPaymentStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p className="profileName">
            <span /> {state.profile.clinic_name}
          </p>
          <h2>Purchase Booking Package</h2>
          <p className="chooseText">This is the package you have selected.</p>
        </div>
        {productDetails.active ? (
          <DetailsCard className="bookDetail smilePass">
            <div className="bookDetail__price">
              <h2>
                {productDetails.name}{" "}
                {productDetails.qty > 1 && (
                  <span>&#215; {productDetails.qty}</span>
                )}
              </h2>

              <p>&#36;{productDetails.price}</p>
            </div>
            <div className="bookDetail__descriptions">
              <p className="bookDetail__descriptions--terms">
                {productDetails.terms}
              </p>

              <p className="bookDetail__descriptions--description">
                {productDetails.description}
              </p>

              <p className="bookDetail__descriptions--includes">
                Includes: {productDetails.details}
              </p>
            </div>
          </DetailsCard>
        ) : (
          <Skeleton count={8} />
        )}
        {productDetails.active ? (
          <div className="termsConditions">
            <div className="termsConditions__title">
              <h2>Terms and Conditions</h2>
              <p>Please read and approve our terms</p>
            </div>
            <div className="termsConditions__agree">
              <div className="checkbox-wrapper">
                <input
                  onChange={() => setTermsAgree(!termsAgree)}
                  name="agree"
                  id="agree"
                  type="checkbox"
                  checked={termsAgree}
                  value="agree"
                />
                <label htmlFor="agree">
                  I have read and I agree to Smile and Company terms and
                  conditions
                </label>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton count={8} />
        )}
        {productDetails.active && termsAgree && (
          <PaymentGateways productType={productType} />
        )}
      </div>
    </MainPaymentStyled>
  )
}

const MainPaymentStyled = styled.div`
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
    .profileName {
      ${B1Sage};
      margin-bottom: 0;
      font-weight: bold;
    }
    h2 {
      ${H1DarkPurple};
      margin-top: 0;
    }

    .chooseText {
      ${H4Lavender};
      margin-top: 5rem;
    }
  }

  .termsConditions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    &__title {
      width: 100%;

      h2,
      p {
        ${B1CharcoalGrey};
        text-transform: uppercase;
        margin: 0;
      }
    }

    &__agree {
      width: 100%;
      margin: 5rem auto;
      .checkbox-wrapper {
        position: relative;

        label {
          ${Nav1CharcoalGrey};
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          padding-right: 5rem;
          cursor: pointer;

          &::before,
          &::after {
            pointer-events: none;
            content: " ";
          }

          &::before {
            display: flex;
            width: 2rem;
            height: 2rem;
            border: solid 0.1rem ${colors.colorAlt};
            background: ${colors.white};
            margin-right: 1rem;
          }

          &::after {
            display: flex;
            position: absolute;
            top: 0.5rem;
            left: 0.5rem;
            width: 1.2rem;
            height: 0.75rem;
            border-bottom: solid 0.4rem ${colors.colorAlt};
            border-left: solid 0.4rem ${colors.colorAlt};
            background: none;
            transform: rotate(-45deg) scale(0);
            transition: transform 0.3s ease;
          }

          &:hover {
            color: ${colors.colorAlt};
          }
        }

        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 2rem;
          height: 2rem;
          -webkit-appearance: none;
          cursor: pointer;

          &:checked + label:after {
            opacity: 1;
            transform: rotate(-45deg) scale(1);
          }
        }
      }
    }
  }
`

const DetailsCard = styled.div`
  margin-bottom: 5rem;

  .bookDetail__price {
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

  .bookDetail__descriptions {
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
`

export default MainPayment
