import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateClick(date);
  };

  return (
    <div>
      <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
    </div>
  );
};

export default Calendar;
