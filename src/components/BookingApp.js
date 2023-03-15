import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import TimeSelection from "./TimeSelection";
import Success from "./Success";

const BookingApp = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [unavailableTimes, setUnavailableTimes] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetchUnavailableTimes(selectedDate);
    }
  }, [selectedDate]);

  const fetchUnavailableTimes = async (date) => {
    try {
      const response = await fetch(`/api/appointments/available/${date}`);
      if (!response.ok) {
        throw new Error("Error fetching unavailable times");
      }
      const data = await response.json();
      setUnavailableTimes(data.map((appointment) => appointment.time));
    } catch (error) {
      console.error("Error fetching unavailable times", error);
    }
  };

  const onDateClick = async (date) => {
    setSelectedDate(date);

    try {
      const response = await fetch(
        `/api/appointments?date=${date.toISOString()}`
      );
      const appointments = await response.json();
      const bookedTimes = appointments.map((appointment) => appointment.time);
      setBookedAppointments(bookedTimes);
    } catch (error) {
      console.error("Error fetching booked appointments", error);
    }
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  async function saveAppointment(date, time, name, email, phone, note) {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, time, name, email, phone, note }),
      });

      if (response.status === 409) {
        // Show an error message for double booking
        alert("This time slot is already booked. Please choose another time.");
      } else if (!response.ok) {
        throw new Error("Error saving appointment");
      } else {
        const savedAppointment = await response.json();
        setAppointment(savedAppointment);
        navigate("/success");
      }
    } catch (error) {
      console.error("Error saving appointment", error);
    }
  }

  const handleTimeSelect = async (time) => {
    setSelectedDate(null); // Reset the selected date
    const appointment = await saveAppointment(
      selectedDate,
      time,
      name,
      email,
      phone,
      note
    );

    if (appointment) {
      // Navigate to the success page
      navigate("/success", { state: { appointment } });
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Book a Meeting</h1>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="note">Note:</label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <Calendar
                isDateDisabled={isDateDisabled}
                onDateClick={onDateClick}
              />
              {selectedDate && (
                <TimeSelection
                  date={selectedDate}
                  onTimeSelect={handleTimeSelect}
                  unavailableTimes={unavailableTimes}
                />
              )}
            </div>
          }
        />
        <Route
          path="/success"
          element={<Success appointment={appointment} />}
        />
      </Routes>
    </div>
  );
};

export default BookingApp;
