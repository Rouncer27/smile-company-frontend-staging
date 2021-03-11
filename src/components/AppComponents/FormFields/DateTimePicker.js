import React from "react"
import TimePicker from "react-time-picker"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import "react-calendar/dist/Calendar.css"
import "react-day-picker/lib/style.css"

const DateTimePicker = ({
  day,
  setDay,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  id,
}) => {
  var tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 1)
  return (
    <div>
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
              <TimePicker
                onChange={event => setStartTime(event, `shift_start`)}
                value={startTime}
                disableClock={true}
                required={true}
              />
            </div>
            <div className="shiftPicker__time--endTime">
              <p>End of the Shift</p>
              <TimePicker
                onChange={event => setEndTime(event, `shift_end`)}
                value={endTime}
                disableClock={true}
                required={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateTimePicker
