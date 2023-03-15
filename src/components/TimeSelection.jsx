import React, { useState } from "react";
import "./TimeSelection.css";

const TimeSelection = ({ date, onTimeSelect }) => {
  const availableTimes = ["10:00", "11:00", "12:00", "13:00", "14:00"];
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmClick = () => {
    onTimeSelect(selectedTime);
  };

  return (
    <div className={`sidebar ${date ? "open" : ""}`}>
      <h2>Select a time:</h2>
      <ul className="time-list">
        {availableTimes.map((time) => (
          <li key={time}>
            <button
              className={`time-button ${
                selectedTime === time ? "selected" : ""
              }`}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </button>
          </li>
        ))}
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
