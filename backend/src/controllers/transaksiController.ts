import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllTransaksi = async (request: Request, response: Response) => {
    try {
        const result = await prisma.transaksi.findMany();

        return response.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.log(error);
        response.json({
            msg: error,
        });
    }
};

export const addTransaksi = async (request: Request, response: Response) => {
    const { userId, movie_id, qty } = request.body;

    const [getUserId, getBarangId] = await Promise.all([
        prisma.user.findUnique({ where: { id: Number(userId) } }),
        prisma.transaksi.findFirst({ where: { movieId: Number(movie_id) } }),
    ]);

    if (getUserId && getBarangId) {
        try {
            const result = await prisma.transaksi.create({
                data: {
                    user: {
                        connect: {
                            id: Number(userId),
                        },
                    },
                    movie: {
                        connect: {
                            id: Number(movie_id),
                        },
                    },
                    qty: qty,
                },
            });
            if (result) {
                const item = await prisma.movie.findUnique({
                    where: { id: Number(movie_id) },
                });

                if (!item) {
                    throw new Error(
                        `Movie dengan id_movie ${movie_id} tidak ditemukan`
                    );
                } else {
                    
                    const result = await prisma.movie.update({
                        where: {
                            id: Number(movie_id),
                        },
                        data: {
                        },
                    });
                }
            }
            response.status(201).json({
                success: true,
                message: "Transaksi Berhasil Dicatat",
                pesan: {
                    movieId: result.movieId,
                    qty: result.qty,
                },
            });
        } catch (error) {
            console.log(error);
            response.json({
                msg: error,
            });
        }
    } else {
        response.json({ msg: "user dan barang belum ada" });
    }
};
