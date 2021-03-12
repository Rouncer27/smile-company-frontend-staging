import React from "react"
import styled from "styled-components"
import {
  H4DarkPurple,
  Nav1CharcoalGrey,
  colors,
} from "../../../../styles/helpers"

import Checkmark from "../../../Icons/AppIcons/Checkmark"
import { timeFormat, getMothName } from "../../../../utils/helperFunc"
import getReadableLocation from "../helper/getReadableLocation"
import getReadablePosition from "../helper/getReadablePosition"

const ApprovedItem = ({ item }) => {
  const currentBookingStartTime = item ? item.shift_start : []
  const currentBookingEndTime = item ? item.shift_end : []
  const startTimes = timeFormat(currentBookingStartTime)
  const endTimes = timeFormat(currentBookingEndTime)

  return (
    <ApprovedItemStyled>
      <div>
        <h2>
          <span className="icon">
            <Checkmark />
          </span>
          <span>{item.clinic_name}</span>
        </h2>
      </div>
      <div className="details">
        <p>Position: {getReadablePosition(item.position)}</p>
        <p>Location / City: {getReadableLocation(item.location)}</p>
        <p>Address: {item.address}</p>
        <p>
          Date:{" "}
          {item.booking_day_off_the_week.charAt(0).toUpperCase() +
            item.booking_day_off_the_week.slice(1)}
          , {getMothName(item.day)} {item.day.split("-")[2]},{" "}
          {item.day.split("-")[0]}
        </p>
        <p>
          Time:{" "}
          {`${startTimes.hour}:${startTimes.minutes} ${startTimes.meridiem}`}{" "}
          till {`${endTimes.hour}:${endTimes.minutes} ${endTimes.meridiem}`}
        </p>
      </div>
    </ApprovedItemStyled>
  )
}

const ApprovedItemStyled = styled.div`
  width: 100%;
  margin: 2rem 0;

  h2 {
    ${H4DarkPurple}
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;

    .icon {
      width: 3rem;
      margin-right: 2rem;
    }
  }

  .details {
    margin-top: 3.5rem;

    p {
      ${Nav1CharcoalGrey};
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: initial;
      }
    }
  }
`

export default ApprovedItem
