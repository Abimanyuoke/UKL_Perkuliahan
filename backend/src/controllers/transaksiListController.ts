import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getTransaksiByUser = async (req: Request, res: Response) => {
    try {
        // Ambil id user dari req.body.user (kalau kamu pakai verifyToken)
        const { id } = req.body.user;

        const transaksi = await prisma.transaksi.findMany({
            where: {
                userId: Number(id),
            },
            include: {
                movie: true, // supaya data movie ikut muncul
            },
        });

        const pesananAnda = transaksi.map((item) => ({
            movie: item.movie ? item.movie.id : null,
            title: item.movie ? item.movie.title : null,
            qty: item.qty,
        }));

        return res.status(200).json({
            success: true,
            pesanan_anda: pesananAnda,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Gagal mengambil pesanan user",
        });
    }
};
