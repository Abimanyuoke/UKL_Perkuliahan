import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import { sign } from "jsonwebtoken";
import { SECRET } from "../global";
import { v4 as uuidv4 } from "uuid";


const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get user, contains means search name of user based on sent keyword */
        const allUser = await prisma.user.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        return response.json({
            status: true,
            data: allUser,
            message: `user has retrieved`
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

export const getUserById = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { id } = request.body.user

        if (!id) {
            return response
            .json({
                status: false,
                message: `User Not Found`
            })
            .status(400)
        }

        /** process to get user, contains means search name of user based on sent keyword */
        const allUser = await prisma.user.findFirst({
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: allUser,
            message: `user has retrieved`
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

export const createUser = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { name, email, password, role } = request.body
        console.log('Incoming body:', request.body)
        const uuid = uuidv4()

        /** process to save new user */
        const newUser = await prisma.user.create({
            data: { uuid, name, email, password: md5(password), role }
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

export const updateUser = async (request: Request, response: Response) => {
    try {
        /** get id of user's id that sent in parameter of URL */
        const { id } = request.params
        /** get requested data (data has been sent from request) */
        const { name, email, password, role } = request.body

        /** make sure that data is exists in database */
        const findUser = await prisma.user.findFirst({ where: { id: Number(id) } })
        if (!findUser) return response
            .status(200)
            .json({ status: false, message: `user is not found` })

        /** default value filename of saved data */
        if (request.file) {
            /** update filename by new uploaded picture */
            /** check the old picture in the folder */
            /** delete the old exists picture if reupload new file */
        }

        /** process to update user's data */
        const updatedUser = await prisma.user.update({
            data: {
                name: name || findUser.name,
                email: email || findUser.email,
                password: password ? md5(password) : findUser.password,
                role: role || findUser.role,
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updatedUser,
            message: `user has updated`
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

export const deleteUser = async (request: Request, response: Response) => {
    try {
        /** get id of user's id that sent in parameter of URL */
        const { id } = request.params
        /** make sure that data is exists in database */
        const findUser = await prisma.user.findFirst({ where: { id: Number(id) } })
        if (!findUser) return response
            .status(200)
            .json({ status: false, message: `user is not found` })

        /** prepare to delete file of deleted user's data */
        /** process to delete user's data */
        const deleteduser = await prisma.user.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deleteduser,
            message: `user has deleted`
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

export const authentication = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body /** get requested data (data has been sent from request) */

        /** find a valid admin based on username and password */
        const findUser = await prisma.user.findFirst({
            where: { email, password: md5(password) }
        })

        /** check is admin exists */
        if (!findUser) return response
            .status(200)
            .json({ status: false, logged: false, message: `Email or password is invalid` })

        let data = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
        }

        /** define payload to generate token */
        let payload = JSON.stringify(data)

        /** generate token */
        let token = sign(payload, SECRET || "joss")

        return response
            .status(200)
            .json({ status: true, logged: true, data: data, message: `Login Success`, token })
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const logout = async (request: Request, response: Response) => {
    try {
        // Kalau pakai blacklist, simpan token di sini ke database / Redis (tidak dilakukan dalam contoh ini)
        return response.status(200).json({
            status: true,
            message: "Logout successful. Login kembali untuk mendapatkan token baru.",
        });
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
};
