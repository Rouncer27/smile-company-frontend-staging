import { Link } from "gatsby"
import React, { useContext } from "react"
import styled from "styled-components"
import { colors, Nav2Lavender } from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"

import Calendar from "../../Icons/AppIcons/Calendar"
import Checked from "../../Icons/AppIcons/Checked"
import Cog from "../../Icons/AppIcons/Cog"
import Dash from "../../Icons/AppIcons/Dash"
import List from "../../Icons/AppIcons/List"
import Man from "../../Icons/AppIcons/Man"

import handleLogout from "./actions/handleLogout"

const SideBar = () => {
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

  return (
    <AppSidebarStyled>
      <nav className="sidebarNav">
        <ul>
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
            {userConfirmed && profileSatisfied ? (
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
            {userConfirmed && profileSatisfied && accountHasCredits ? (
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
            <button onClick={() => handleLogout(dispatch)} type="button">
              <span className="icon">
                <List />
              </span>{" "}
              <span className="text">Log Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </AppSidebarStyled>
  )
}

const AppSidebarStyled = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: center;
  position: relative;
  background-color: ${colors.colorAlt};
  width: 100%;

  @media (min-width: 768px) {
    width: calc(30vw);
  }

  .sidebarNav {
    position: relative;
    padding: 20rem 0;
    width: 100%;
    z-index: 10;

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
  }
`

export default SideBar
