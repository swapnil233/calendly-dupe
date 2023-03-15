import React, { useState } from "react";
import {
  formatTimeTo24Hour,
  generateTimeSlots,
  formatTimeTo12Hour,
} from "../utils";
import "./TimeSelection.css";

const TimeSelection = ({ date, onTimeSelect, unavailableTimes }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const timeSlots = generateTimeSlots();

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmClick = () => {
    onTimeSelect(selectedTime);
  };

  const isTimeUnavailable = (time) => unavailableTimes.includes(time);

  return (
    <div className={`sidebar ${date ? "open" : ""}`}>
      <h2>Select a time:</h2>
      <ul className="time-list">
        {timeSlots.map((time) => {
          const time24Hour = formatTimeTo24Hour(time);
          const isUnavailable = isTimeUnavailable(time24Hour);
          return (
            <li key={time}>
              <button
                className={`time-button ${
                  selectedTime === time24Hour ? "selected" : ""
                } ${isUnavailable ? "unavailable" : ""}`}
                onClick={() => !isUnavailable && handleTimeClick(time24Hour)}
                disabled={isUnavailable}
              >
                {formatTimeTo12Hour(time24Hour)}
              </button>
            </li>
          );
        })}
      </ul>
      {selectedTime && (
        <button className="confirm-button" onClick={handleConfirmClick}>
          Confirm
        </button>
      )}
    </div>
  );
};

export default TimeSelection;
