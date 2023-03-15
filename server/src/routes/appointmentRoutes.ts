import { Router } from "express";
import { getAppointments, getAvailableAppointments, createAppointment } from "../controllers/appointmentController";

const router = Router();

router.get("/api/appointments", getAppointments);
router.get("/api/appointments/available/:date", getAvailableAppointments);
router.post("/api/appointments", createAppointment);

export default router;
