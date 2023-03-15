const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/appointments", async (req, res) => {
  const { date } = req.query;
  const parsedDate = new Date(date);

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        date: parsedDate,
      },
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching appointments.",
    });
  }
});

app.get("/api/appointments/available/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        date: new Date(date),
      },
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching available appointments.",
    });
  }
});

app.get("/api/appointments/fully-booked", async (req, res) => {
  try {
    const fullyBookedDates = await prisma.$queryRaw`
      SELECT DATE_FORMAT(date, '%Y-%m-%d') as date
      FROM (
        SELECT date, COUNT(*) as count
        FROM appointment
        GROUP BY date
      ) as counts
      WHERE count >= 9;
    `;

    res.status(200).json(fullyBookedDates.map((record) => record.date));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching fully booked dates.",
    });
  }
});

app.post("/api/appointments", async (req, res) => {
  const { date, time, name, email, phone, note } = req.body;

  try {
    // Check for existing appointment with the same date and time
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: new Date(date),
        time,
      },
    });

    if (existingAppointment) {
      // If an appointment exists, return a 409 Conflict status with a message
      res.status(409).json({ message: "This time slot is already booked." });
    } else {
      // If not, create a new appointment
      const appointment = await prisma.appointment.create({
        data: {
          date: new Date(date),
          time,
          name,
          email,
          phone,
          note,
        },
      });
      res.status(201).json(appointment);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the appointment." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
