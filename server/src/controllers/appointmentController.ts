import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAppointments = async (req: Request, res: Response) => {
    const { date } = req.query;
    const parsedDate = new Date(date as string);

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
};

export const getAvailableAppointments = async (req: Request, res: Response) => {
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
};

export const createAppointment = async (req: Request, res: Response) => {
    const { date, time, name, email, phone, note, eventId } = req.body;

    // Explicitly set the date and time
    const appointmentDate = new Date(date);
    appointmentDate.setUTCHours(0, 0, 0, 0);

    const startOfDay = new Date(appointmentDate);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    try {
        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                time,
            },
        });



        if (existingAppointment) {
            res.status(409).json({ message: "This time slot is already booked." });
        } else {
            const appointment = await prisma.appointment.create({
                data: {
                    date: appointmentDate,
                    time,
                    name,
                    email,
                    phone,
                    note,
                    event: {
                        connect: {
                            id: eventId,
                        },
                    },
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
};