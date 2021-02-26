import React from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import styled from "styled-components"
import { Nav1CharcoalGrey, colors } from "../../../styles/helpers"

const DatePicker = ({ label, value, onChange, id }) => {
  console.log("RIGHT HERE: ", value)
  return (
    <DatePickerStyled>
      <p>{label}</p>
      <Calendar
        onChange={event => onChange(event, id)}
        value={value}
        minDate={new Date()}
        required={true}
      />
    </DatePickerStyled>
  )
}

const DatePickerStyled = styled.div`
  margin: 3rem 0;
  p {
    ${Nav1CharcoalGrey};
    margin-bottom: 1.5rem;

    &:hover {
      color: ${colors.colorAlt};
      cursor: inherit;
    }
  }
`

export default DatePicker
