import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { BASE_URL, SECRET } from "../global";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import { sign } from "jsonwebtoken";
import jwt from "jsonwebtoken"


const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get user, contains means search name of user based on sent keyword */
        const allUser = await prisma.user.findMany({
            where: { nama_pelanggan: { contains: search?.toString() || "" } }
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
        const { nama_pelanggan, alamat, gender, telepon } = request.body
        const uuid = uuidv4()

        /** process to save new user */
        const newUser = await prisma.user.create({
            data: { uuid, nama_pelanggan, alamat, gender, telepon }
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

// export const createUser = async (request: Request, response: Response) => {
//     try {
//         const { name, email, password, gender } = request.body
//         const uuid = uuidv4()

//         let filename = ""
//         if (request.file) filename = request.file.filename

//         const newUser = await prisma.user.create({
//             data: {
//                 uuid,
//                 name,
//                 email,
//                 password: md5(password),
//                 gender,
//                 profile_picture: filename
//             }
//         })

//         const tokenPayload = {
//             id: newUser.id,
//             uuid: newUser.uuid,
//             name: newUser.name,
//             gender: newUser.gender,
//         }

//         const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "default_secret", {
//             expiresIn: "7d"
//         })

//         return response.status(200).json({
//             status: true,
//             message: `User created successfully`,
//             token,
//             data: {
//                 id: newUser.id,
//                 name: newUser.name,
//                 gender: newUser.gender,
//                 profile_picture: newUser.profile_picture
//             }
//         })

//     } catch (error) {
//         return response.status(400).json({
//             status: false,
//             message: `There is an error. ${error}`
//         })
//     }
// }

export const updateUser = async (request: Request, response: Response) => {
    try {
        /** get id of user's id that sent in parameter of URL */
        const { id } = request.params
        /** get requested data (data has been sent from request) */
        const { nama_pelanggan, alamat, gender, telepon } = request.body

        /** make sure that data is exists in database */
        const findUser = await prisma.user.findFirst({ where: { id: Number(id) } })
        if (!findUser) return response
            .status(200)
            .json({ status: false, message: `user is not found` })

        /** process to update user's data */
        const updatedUser = await prisma.user.update({
            data: {
                nama_pelanggan: nama_pelanggan || findUser.nama_pelanggan,
                alamat: alamat || findUser.alamat,
                telepon: telepon || findUser.telepon,
                gender: gender || findUser.gender,
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

// export const changePicture = async (request: Request, response: Response) => {
//     try {
//         /** get id of menu's id that sent in parameter of URL */
//         const { id } = request.params

//         /** make sure that data is exists in database */
//         const findUser = await prisma.user.findFirst({ where: { id: Number(id) } })
//         if (!findUser) return response
//             .status(200)
//             .json({ status: false, message: `User is not found` })
        
//         /** default value filename of saved data */
//         let filename = findUser.profile_picture
//         if (request.file) {
//             /** update filename by new uploaded picture */
//             filename = request.file.filename
//             /** check the old picture in the folder */
//             let path = `${BASE_URL}/../public/profile_picture/${findUser.profile_picture}`
//             let exists = fs.existsSync(path)
//             /** delete the old exists picture if reupload new file */
//             if(exists && findUser.profile_picture !== ``) fs.unlinkSync(path)
//         }
        
//         /** process to update picture in database */
//         const updatePicture = await prisma.user.update({
//             data: { profile_picture: filename },
//             where: { id: Number(id) }
//         })

//         return response.json({
//             status: true,
//             data: updatePicture,
//             message: `Picture has changed`
//         }).status(200)
//     } catch (error) {
//         return response.json({
//             status: false,
//             message: `There is an error. ${error}`
//         }).status(400)
//     }
// }

// export const deleteUser = async (request: Request, response: Response) => {
//     try {
//         /** get id of user's id that sent in parameter of URL */
//         const { id } = request.params
//         /** make sure that data is exists in database */
//         const findUser = await prisma.user.findFirst({ where: { id: Number(id) } })
//         if (!findUser) return response
//             .status(200)
//             .json({ status: false, message: `user is not found` })

//         /** prepare to delete file of deleted user's data */
//         let path = `${BASE_URL}/public/profile_picture/${findUser.profile_picture}` /** define path (address) of file location */
//         let exists = fs.existsSync(path)
//         if (exists && findUser.profile_picture !== ``) fs.unlinkSync(path) /** if file exist, then will be delete */

//         /** process to delete user's data */
//         const deleteduser = await prisma.user.delete({
//             where: { id: Number(id) }
//         })
//         return response.json({
//             status: true,
//             data: deleteduser,
//             message: `user has deleted`
//         }).status(200)
//     } catch (error) {
//         return response
//             .json({
//                 status: false,
//                 message: `There is an error. ${error}`
//             })
//             .status(400)
//     }
// }

// export const authentication = async (request: Request, response: Response) => {
//     try {
//         const { email, password } = request.body /** get requested data (data has been sent from request) */

//         /** find a valid admin based on username and password */
//         const findUser = await prisma.user.findFirst({
//             where: { email, password: md5(password) }
//         })

//         /** check is admin exists */
//         if (!findUser) return response
//             .status(200)
//             .json({ status: false, logged: false, message: `Email or password is invalid` })

//         let data = {
//             id: findUser.id,
//             name: findUser.name,
//             email: findUser.email,
//             gender: findUser.gender,
//             profile_picture: findUser.profile_picture,
//         }

//         /** define payload to generate token */
//         let payload = JSON.stringify(data)

//         /** generate token */
//         let token = sign(payload, SECRET || "joss")

//         return response
//             .status(200)
//             .json({ status: true, logged: true, data: data, message: `Login Success`, token })
//     } catch (error) {
//         return response
//             .json({
//                 status: false,
//                 message: `There is an error. ${error}`
//             })
//             .status(400)
//     }
// }

