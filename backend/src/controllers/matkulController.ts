import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getMatkul = async (request: Request, response: Response) => {
    try {
        const matkul = await prisma.matKul.findMany()
        response.json({ status: true, message: "Success", data: matkul })
    } catch (error) {
        response.status(500).json({ status: false, message: (error instanceof Error ? error.message : String(error)) })
    }
}

export const createMatkul = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { name_matkul, sks } = request.body
        const uuid = uuidv4()

        /** process to save new user */
        const newUser = await prisma.matKul.create({
            data: { uuid, name_matkul, sks }
        })

        return response.json({
            status: true,
            data: newUser,
            message: `New user has created`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const selectMatkul = async (request: Request, response: Response) => {
    try {
        const { list_matkul } = request.body;

        // Validasi bahwa input adalah array
        if (!Array.isArray(list_matkul)) {
            return response.status(400).json({
                status: false,
                message: "list_matkul harus berupa array",
            });
        }

        // Ambil hanya matkul yang valid dari database
        const validMatkul = await prisma.matKul.findMany({
            where: {
                id: {
                    in: list_matkul.map(Number),
                },
            },
        });

        // Jika tidak ada matkul yang valid, return error
        if (validMatkul.length === 0) {
            return response.status(404).json({
                status: false,
                message: "Tidak ada mata kuliah yang cocok dengan ID tersebut",
            });
        }

        // Simpan hanya matkul yang valid
        await prisma.$transaction(
            validMatkul.map((matkul: { id: any; }) =>
                prisma.selectedMatkul.create({
                    data: {
                        matkulId: matkul.id,
                    },
                })
            )
        );

        // Response sukses
        return response.json({
            status: true,
            message: "Matkul selected successfully",
            data: {
                list_matkul: validMatkul,
            },
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error instanceof Error ? error.message : String(error),
        });
    }
};
