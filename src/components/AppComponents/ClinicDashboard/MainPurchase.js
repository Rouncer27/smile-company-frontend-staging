import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link, navigate } from "gatsby"
import { UserContext } from "../../../context/UserContext"
import Skeleton from "react-loading-skeleton"

import {
  colors,
  Btn1LightSage,
  H1DarkPurple,
  B1Sage,
  H4Lavender,
  H4DarkPurple,
  Nav1CharcoalGrey,
} from "../../../styles/helpers"

const MainPurchase = () => {
  const [bookingDetails, setBookingDetails] = useState({
    booking_one_description: "",
    booking_one_includes_details: "",
    booking_one_price: null,
    booking_one_purchase_terms: "",
    ten_pass_description: "",
    ten_pass_includes_details: "",
    ten_pass_price: null,
    ten_pass_purchase_terms: "",
    smile_member_description: "",
    smile_member_included_details: "",
    smile_member_price: null,
    smile_member_purchase_terms: "",
  })
  const [state, dispatch] = useContext(UserContext)
  const token = state.token

  const getTheBookingPackages = async () => {
    // dispatch({ type: "USER_LOADING" })
    try {
      const reponse = await axios.get(
        `${process.env.GATSBY_API_URL}/booking-packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      dispatch({
        type: "USER_LOADING_COMPLETE",
      })

      setBookingDetails({
        booking_one_description: reponse.data.booking_one_description
          ? reponse.data.booking_one_description
          : "",
        booking_one_includes_details: reponse.data.booking_one_includes_details
          ? reponse.data.booking_one_includes_details
          : "",
        booking_one_price: reponse.data.booking_one_price
          ? reponse.data.booking_one_price
          : null,
        booking_one_purchase_terms: reponse.data.booking_one_purchase_terms
          ? reponse.data.booking_one_purchase_terms
          : "",
        ten_pass_description: reponse.data.ten_pass_description
          ? reponse.data.ten_pass_description
          : "",
        ten_pass_includes_details: reponse.data.ten_pass_includes_details
          ? reponse.data.ten_pass_includes_details
          : "",
        ten_pass_price: reponse.data.ten_pass_price
          ? reponse.data.ten_pass_price
          : null,
        ten_pass_purchase_terms: reponse.data.ten_pass_purchase_terms
          ? reponse.data.ten_pass_purchase_terms
          : "",
        smile_member_description: reponse.data.smile_member_description
          ? reponse.data.smile_member_description
          : "",
        smile_member_included_details: reponse.data
          .smile_member_included_details
          ? reponse.data.smile_member_included_details
          : "",
        smile_member_price: reponse.data.smile_member_price
          ? reponse.data.smile_member_price
          : null,
        smile_member_purchase_terms: reponse.data.smile_member_purchase_terms
          ? reponse.data.smile_member_purchase_terms
          : "",
      })

      console.log("BOOKINGS: ", reponse)
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
    // If this person is not confirmed yet, send them back to the main dashboard. //
    if (!state.user.confirmed)
      return navigate("/app/clinic-dashboard", { replace: true })
    // If this person is not filled out the profile, send them back to the main dashboard. //
    if (!state.profile.profile_satisfied)
      return navigate("/app/clinic-dashboard", { replace: true })

    // Get the booking details. //

    getTheBookingPackages()
  }, [])

  console.log("BOOKING DETAILS: ", bookingDetails)

  return (
    <MainPurchaseStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p className="profileName">
            <span /> {state.profile.clinic_name}
          </p>
          <h2>Purchase Booking Package</h2>
          <p className="chooseText">
            Choose the option that is right for you and your clinic.
          </p>
        </div>
        <div className="dashDetails">
          <div className="bookDetail oneBook">
            <div className="bookDetail__price">
              <h2>One Booking </h2>
              <p>
                {bookingDetails.booking_one_price ? (
                  <>&#36;{bookingDetails.booking_one_price}</>
                ) : (
                  <Skeleton />
                )}
              </p>
            </div>
            <div className="bookDetail__descriptions">
              {bookingDetails.booking_one_purchase_terms ? (
                <p className="bookDetail__descriptions--terms">
                  {bookingDetails.booking_one_purchase_terms}
                </p>
              ) : (
                <Skeleton />
              )}
              {bookingDetails.booking_one_description ? (
                <p className="bookDetail__descriptions--description">
                  {bookingDetails.booking_one_description}
                </p>
              ) : (
                <Skeleton />
              )}
              {bookingDetails.booking_one_includes_details ? (
                <p className="bookDetail__descriptions--includes">
                  Includes: {bookingDetails.booking_one_includes_details}
                </p>
              ) : (
                <Skeleton />
              )}
            </div>
            <div className="bookDetail__btn">
              <Link to="/app/clinic-dashboard/payment?product=onebooking">
                Purchase One Booking
              </Link>
            </div>
          </div>

          <div className="bookDetail smilePass">
            <div className="bookDetail__price">
              <h2>10 Smile Pass</h2>
              <p>
                {bookingDetails.ten_pass_price ? (
                  <>&#36;{bookingDetails.ten_pass_price}</>
                ) : (
                  <Skeleton />
                )}
              </p>
            </div>
            <div className="bookDetail__descriptions">
              {bookingDetails.ten_pass_purchase_terms ? (
                <p className="bookDetail__descriptions--terms">
                  {bookingDetails.ten_pass_purchase_terms}
                </p>
              ) : (
                <Skeleton />
              )}
              {bookingDetails.ten_pass_description ? (
                <p className="bookDetail__descriptions--description">
                  {bookingDetails.ten_pass_description}
                </p>
              ) : (
                <Skeleton />
              )}
              {bookingDetails.ten_pass_includes_details ? (
                <p className="bookDetail__descriptions--includes">
                  Includes: {bookingDetails.ten_pass_includes_details}
                </p>
              ) : (
                <Skeleton />
              )}
            </div>
            <div className="bookDetail__btn">
              <Link to="/app/clinic-dashboard/payment?product=smilepass">
                Purchase 10 Smile Pass
              </Link>
            </div>
          </div>

          <div className="bookDetail smilePass">
            <div className="bookDetail__price">
              <h2>Smile Membership</h2>
              <p>
                {bookingDetails.smile_member_price ? (
                  <>&#36;{bookingDetails.smile_member_price}</>
                ) : (
                  <Skeleton />
                )}
              </p>
            </div>
            <div className="bookDetail__descriptions">
              {bookingDetails.smile_member_purchase_terms ? (
                <p className="bookDetail__descriptions--terms">
                  {bookingDetails.smile_member_purchase_terms}
                </p>
              ) : (
                <Skeleton />
              )}
              {bookingDetails.smile_member_description ? (
                <p className="bookDetail__descriptions--description">
                  {bookingDetails.smile_member_description}
                </p>
              ) : (
                <Skeleton />
              )}
              {bookingDetails.smile_member_included_details ? (
                <p className="bookDetail__descriptions--includes">
                  Includes: {bookingDetails.smile_member_included_details}
                </p>
              ) : (
                <Skeleton />
              )}
            </div>
            <div className="bookDetail__btn">
              <Link to="/app/clinic-dashboard/payment?product=membership">
                Purchase Monthly Membership
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainPurchaseStyled>
  )
}

const MainPurchaseStyled = styled.div`
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

  .dashDetails {
    width: 100%;
  }

  .bookDetail {
    margin-bottom: 5rem;

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

    &__btn {
      width: 100%;
      text-align: right;

      a {
        ${Btn1LightSage}
      }
    }
  }
`

export default MainPurchase
