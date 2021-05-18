import { Link } from "gatsby"
import React, { useContext, useState } from "react"
import styled from "styled-components"
import { colors, Nav2Lavender } from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"

import Calendar from "../../Icons/AppIcons/Calendar"
import Checked from "../../Icons/AppIcons/Checked"
import Cog from "../../Icons/AppIcons/Cog"
import Dash from "../../Icons/AppIcons/Dash"
import List from "../../Icons/AppIcons/List"
import Man from "../../Icons/AppIcons/Man"

import mainSidebar from "./style/mainSidebar"
import handleLogout from "./actions/handleLogout"

const SideBar = () => {
  const [state, dispatch] = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const userConfirmed = state.user.confirmed

  const profileSatisfied =
    state.profile && state.profile.profile_satisfied
      ? state.profile.profile_satisfied
      : false

  const generalSettingSatisfied =
    state.profile && state.profile.general_satisfied
      ? state.profile.general_satisfied
      : false

  const experienceSatisfied =
    state.profile &&
    state.profile.general_satisfied &&
    state.profile.experience_satisfied
      ? state.profile.experience_satisfied
      : false

  const contactSatisfied =
    state.profile &&
    state.profile.general_satisfied &&
    state.profile.experience_satisfied &&
    state.profile.contact_satisfied
      ? state.profile.contact_satisfied
      : false

  const underReview =
    state.profile.profile_satisfied && !state.profile.user_approved

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
              <Link to="/app/professional-dashboard">
                <span className="icon">
                  <Man />
                </span>{" "}
                <span className="text">Main Dashbaord</span>
              </Link>
            </li>
            <li>
              {userConfirmed ? (
                <Link to="/app/professional-dashboard/general">
                  <span className="icon">
                    <Cog />
                  </span>{" "}
                  <span className="text">General Information</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Cog />
                  </span>{" "}
                  <span className="text">General Information</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed && generalSettingSatisfied ? (
                <Link to="/app/professional-dashboard/experience">
                  <span className="icon">
                    <Dash />
                  </span>{" "}
                  <span className="text">My Experience</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Dash />
                  </span>{" "}
                  <span className="text">My Experience</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed &&
              generalSettingSatisfied &&
              experienceSatisfied ? (
                <Link to="/app/professional-dashboard/availability">
                  <span className="icon">
                    <Cog />
                  </span>{" "}
                  <span className="text">My Availability</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Cog />
                  </span>{" "}
                  <span className="text">My Availability</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed && profileSatisfied && !underReview ? (
                <Link to="/app/professional-dashboard/booking-requests">
                  <span className="icon">
                    <Checked />
                  </span>{" "}
                  <span className="text">Booking Requests</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Checked />
                  </span>{" "}
                  <span className="text">Booking Requests</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed && profileSatisfied && !underReview ? (
                <Link to="/app/professional-dashboard/booking-approved">
                  <span className="icon">
                    <Calendar />
                  </span>{" "}
                  <span className="text">Approved Bookings</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <Calendar />
                  </span>{" "}
                  <span className="text">My Bookings</span>
                </button>
              )}
            </li>
            <li>
              {userConfirmed && profileSatisfied && !underReview ? (
                <Link to="/app/professional-dashboard/bookings-history">
                  <span className="icon">
                    <List />
                  </span>{" "}
                  <span className="text">Bookings History</span>
                </Link>
              ) : (
                <button type="button" disabled={true}>
                  <span className="icon">
                    <List />
                  </span>{" "}
                  <span className="text">Bookings History</span>
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
