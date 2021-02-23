import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { colors, Nav2Lavender } from "../../../styles/helpers"

import Calendar from "../../Icons/AppIcons/Calendar"
import Checked from "../../Icons/AppIcons/Checked"
import Cog from "../../Icons/AppIcons/Cog"
import Dash from "../../Icons/AppIcons/Dash"
import List from "../../Icons/AppIcons/List"
import Man from "../../Icons/AppIcons/Man"

const SideBar = () => {
  return (
    <AppSidebarStyled>
      <nav className="sidebarNav">
        <ul>
          <li>
            <Link to="/app/clinic-dashboard">
              <span className="icon">
                <Dash />
              </span>{" "}
              <span className="text">Main Dashbaord</span>
            </Link>
          </li>
          <li>
            <Link to="/app/clinic-dashboard/profile-settings">
              <span className="icon">
                <Man />
              </span>{" "}
              <span className="text">Clinic Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="icon">
                <Cog />
              </span>{" "}
              <span className="text">Contact Information</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="icon">
                <Dash />
              </span>{" "}
              <span className="text">Purchase Booking Package</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="icon">
                <Calendar />
              </span>{" "}
              <span className="text">Create a Booking</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="icon">
                <Checked />
              </span>{" "}
              <span className="text">Review Applicants</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="icon">
                <List />
              </span>{" "}
              <span className="text">Historical</span>
            </Link>
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

    a {
      ${Nav2Lavender};
      display: flex;
      align-items: center;
      width: 80%;
      margin: auto;
      padding: 1.5rem;

      .icon {
        display: inline-block;
        width: 2.4rem;
      }

      .text {
        display: inline-block;
        padding-left: 2rem;
      }
    }
  }
`

export default SideBar
