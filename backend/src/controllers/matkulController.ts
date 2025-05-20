import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const createMatkul = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { name_matkul, sks } = request.body
        const uuid = uuidv4()

        /** process to save new user */
        const newUser = await prisma.matKul.create({
            data: { uuid, name_matkul: name_matkul, sks: sks, }
        })

        return response.json({
            status: true,
            data: newUser,
            message: `New Matkul has created`
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