import React from "react";

const Success = ({ appointment }) => {
  const appointmentDate = new Date(appointment.date);
  const formattedDate = `${appointmentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  return (
    <div>
      <h1>Appointment successfully booked!</h1>
      <p>
        Thank you, {appointment.name}, for booking your appointment. We look
        forward to meeting you on {formattedDate} at {appointment.time}!
      </p>
    </div>
  );
};

export default Success;
