import React, { useState } from "react"
import styled from "styled-components"
import TimePicker from "react-time-picker"
import Calendar from "react-calendar"
import DatePicker from "react-datepicker"
import "react-calendar/dist/Calendar.css"

import "react-calendar/dist/Calendar.css"
import "react-day-picker/lib/style.css"
import "react-datepicker/dist/react-datepicker.css"

const DateTimePicker = ({
  day,
  setDay,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  id,
  timesDontMakeSense,
}) => {
  var tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 1)

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleSetStartDate = date => {
    setStartDate(date)
    if (date === null) {
      return setStartTime("", "shift_start")
    }
    setStartTime(date.toLocaleTimeString("it-IT"), `shift_start`)
  }

  const handleSetEndDate = date => {
    setEndDate(date)
    if (date === null) {
      return setStartTime("", "shift_end")
    }
    setEndTime(date.toLocaleTimeString("it-IT"), `shift_end`)
  }

  return (
    <DateTimePickerStyled>
      <div className="shiftPicker">
        <div className="shiftPicker__wrapper">
          <div className="shiftPicker__calendar">
            <p>What day are you hiring for?</p>
            <Calendar
              onChange={event => setDay(event, "day")}
              value={day}
              minDate={tomorrow}
              required={true}
            />
          </div>
          <div className="shiftPicker__time">
            <div className="shiftPicker__time--startTime">
              <p>Start of the Shift</p>
              {timesDontMakeSense && (
                <p className="inputError">
                  Your shift start and end times don't make sense. Please review
                  and fix before submitting.
                </p>
              )}
              <DatePicker
                selected={startDate}
                onChange={date => handleSetStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Start of the Shift"
                dateFormat="hh:mm aa"
              />
            </div>

            <div className="shiftPicker__time--endTime">
              <p>End of the Shift</p>
              {timesDontMakeSense && (
                <p className="inputError">
                  Your shift start and end times don't make sense. Please review
                  and fix before submitting.
                </p>
              )}
              <DatePicker
                selected={endDate}
                onChange={date => handleSetEndDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="End of the Shift"
                dateFormat="hh:mm aa"
              />
            </div>
          </div>
        </div>
      </div>
    </DateTimePickerStyled>
  )
}

const DateTimePickerStyled = styled.div`
  .shiftPicker {
    width: 100%;
  }
`

export default DateTimePicker
