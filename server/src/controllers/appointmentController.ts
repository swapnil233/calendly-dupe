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
    const { date, time, name, email, phone, note } = req.body;

    try {
        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                date: new Date(date),
                time,
            },
        });

        if (existingAppointment) {
            res.status(409).json({ message: "This time slot is already booked." });
        } else {
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
};
