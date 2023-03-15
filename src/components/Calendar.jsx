import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ onDateClick, fullyBookedDates = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateClick(date);
  };

  const isDateFullyBooked = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return fullyBookedDates.includes(dateString);
  };

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        minDate={minDate}
        filterDate={(date) => !isDateFullyBooked(date)}
      />
    </div>
  );
};

export default Calendar;
