// NPM Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
// Common styles
import mainSidebar from "./styles/mainSidebar"
import { colors, Nav2Lavender } from "../../../styles/helpers"
// Components
import Calendar from "../../Icons/AppIcons/Calendar"
import Checked from "../../Icons/AppIcons/Checked"
import Cog from "../../Icons/AppIcons/Cog"
import Dash from "../../Icons/AppIcons/Dash"
import List from "../../Icons/AppIcons/List"
import Man from "../../Icons/AppIcons/Man"

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const userConfirmed = state.user.confirmed
  const profileSatisfied =
    state.profile && state.profile.profile_satisfied
      ? state.profile.profile_satisfied
      : false
  const accountHasCredits =
    state.profile && state.profile.monthly_subscription
      ? true
      : state.profile && state.profile.credits > 0
      ? true
      : false

  const accountHasInvoices =
    state.profile && state.profile.invoices && state.profile.invoices.length > 0

  const accountHasBookings =
    state.profile && state.profile.bookings && state.profile.bookings.length > 0

  const isActiveMembership = state.profile.monthly_subscription

  const bookings = state.profile.bookings ? state.profile.bookings : []
  const hasExpiredBookings = bookings.filter(book => book.is_expired).length > 0
  const accountHasFees = state.profile.has_short_fee

  const handleLogout = async () => {
    dispatch({ type: "USER_LOADING" })
    try {
      await axios.post(
        `${process.env.GATSBY_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      )

      dispatch({ type: "USER_LOGOUT" })
      dispatch({
        type: "USER_ALERT",
        payload: { messgae: "You have been logged out of your account." },
      })
    } catch (err) {
      console.dir(err)
    }

    navigate("/login", { replace: true })
  }

  return (
    <>
      <AppSidebarStyled open={isOpen}>
        <nav className="sidebarNav">
          <ul>
            <li className="websiteHome">
              <Link to="/">
                <span className="icon">
                  <List />
                </span>{" "}
                <span className="text">Back To Website</span>
              </Link>
            </li>
            <li>
              <Link to="/app/clinic-dashboard">
                <span className="icon">
                  <Cog />
                </span>{" "}
                <span className="text">Main Dashbaord</span>
              </Link>
            </li>
            <li>
              {userConfirmed ? (
                <Link to="/app/clinic-dashboard/profile-settings">
                  <span className="icon">
                    <Man />
                  </span>{" "}
                  <span className="text">Clinic Details</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Man />
                  </span>{" "}
                  <span className="text">Clinic Details</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed &&
              profileSatisfied &&
              !accountHasFees &&
              !isActiveMembership ? (
                <Link to="/app/clinic-dashboard/booking-packages">
                  <span className="icon">
                    <Dash />
                  </span>{" "}
                  <span className="text">Purchase Booking Package</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Dash />
                  </span>{" "}
                  <span className="text">Purchase Booking Package</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed &&
              profileSatisfied &&
              accountHasCredits &&
              !accountHasFees ? (
                <Link to="/app/clinic-dashboard/create-booking">
                  <span className="icon">
                    <Calendar />
                  </span>{" "}
                  <span className="text">Create a Booking</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Calendar />
                  </span>{" "}
                  <span className="text">Create a Booking</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed && profileSatisfied && accountHasBookings ? (
                <Link to="/app/clinic-dashboard/bookings">
                  <span className="icon">
                    <Checked />
                  </span>{" "}
                  <span className="text">Review Bookings</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Checked />
                  </span>{" "}
                  <span className="text">Review Bookings</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed &&
              profileSatisfied &&
              accountHasBookings &&
              hasExpiredBookings ? (
                <Link to="/app/clinic-dashboard/bookings-history">
                  <span className="icon">
                    <Checked />
                  </span>{" "}
                  <span className="text">Booking History</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Checked />
                  </span>{" "}
                  <span className="text">Booking History</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed && profileSatisfied && accountHasInvoices ? (
                <Link to="/app/clinic-dashboard/invoices">
                  <span className="icon">
                    <List />
                  </span>{" "}
                  <span className="text">Invoice Records</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <List />
                  </span>{" "}
                  <span className="text">Invoice Records</span>
                </button>
              )}
            </li>
            <li>
              <button onClick={() => handleLogout()} type="button">
                <span className="icon">
                  <List />
                </span>{" "}
                <span className="text">Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </AppSidebarStyled>
      <MobileNavButton isOpen={isOpen}>
        <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      </MobileNavButton>
    </>
  )
}

const MobileNavButton = styled.div`
  button {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0.25rem;
    left: 0.25rem;
    width: 5.5rem;
    height: 5.5rem;
    margin: 0 auto;
    padding: 0;
    background: ${props => props.theme.colorTertiary};
    border: 0.1rem solid ${props => props.theme.white};
    box-shadow: 0.25rem 0.25rem 0.5rem 0rem rgba(0, 0, 0, 0.5);
    color: ${props =>
      props.isOpen ? props.theme.colorTertiary : props.theme.white};
    text-align: center;
    z-index: 99999999;

    @media (min-width: 768px) {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }

    &::before,
    &::after {
      display: block;
      position: absolute;
      right: 0;
      left: 0;
      width: 80%;
      height: 0.2rem;
      margin: 0 auto;
      transform: rotate(0);
      transform-origin: center center;
      transition: all 0.2s ease;
      background-color: ${props => props.theme.white};
      content: "";
    }

    &:focus {
      outline: none;
    }

    &::before {
      top: ${props => (props.isOpen ? "50%" : "1rem")};
      transform: rotate(${props => (props.isOpen ? "135deg" : "0deg")});
    }

    &::after {
      bottom: ${props => (props.isOpen ? "50%" : "1rem")};
      transform: rotate(${props => (props.isOpen ? "-135deg" : "0deg")});
    }

    &:hover {
      cursor: pointer;
      &::before {
        top: ${props => (props.isOpen ? "50%" : "0.5rem")};
      }

      &::after {
        bottom: ${props => (props.isOpen ? "50%" : "0.5rem")};
      }
    }
  }
`

const AppSidebarStyled = styled.div`
  ${mainSidebar};

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-out;
    transform: ${props =>
      props.open ? "translateX(0%)" : "translateX(-110%)"};
    z-index: 9999999;
  }

  .sidebarNav {
    position: relative;
    padding: 0;
    width: 100%;
    z-index: 10;

    @media (min-width: 768px) {
      padding: 20rem 0;
    }

    ul {
      width: 100%;
    }

    li {
      width: 100%;
      border-bottom: 0.1rem solid ${colors.colorSecondary};
    }

    a,
    button {
      ${Nav2Lavender};
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      width: 80%;
      margin: auto;
      line-height: 1.8rem;
      padding: 1.5rem;

      &:hover {
        color: ${colors.white};
      }

      &:disabled {
        color: rgba(173, 137, 166, 0.25);
        cursor: not-allowed;
      }

      .icon {
        display: inline-block;
        width: 2.4rem;
        line-height: 1.8rem;
      }

      .text {
        display: inline-block;
        padding-left: 2rem;
        line-height: 1.8rem;
      }
    }

    a:hover {
      color: ${colors.white};
    }

    a[aria-current="page"] {
      color: ${colors.white};
      cursor: inherit;
    }

    li.websiteHome {
      display: block;

      @media (min-width: 768px) {
        display: none;
      }
    }
  }
`

export default SideBar
