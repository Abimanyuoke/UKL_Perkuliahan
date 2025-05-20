import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/authorization";

const router = Router();

/**
 * POST /logout
 * Requires valid token to "logout"
 */
router.post("/logout", verifyToken, (request: Request, response: Response) => {
    // Kalau pakai blacklist token (optional), bisa di-log di DB
    // Di sini kita cukup beri pesan bahwa logout berhasil
    return response.status(200).json({
        message: "Logout successful. Please login kembali untuk mendapatkan token baru.",
        success: true,
    });
});

export default router;


