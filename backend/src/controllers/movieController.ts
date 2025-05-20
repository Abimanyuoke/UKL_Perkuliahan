import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../global";
import fs from "fs"

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllMovies = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get Movie, contains means search name of Movie based on sent keyword */
        const allMovies = await prisma.movie.findMany({
            where: { title: { contains: search?.toString() || "" } }
        })

        return response.json({
            status: true,
            data: allMovies,
            message: `Movies has retrieved`
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

export const createMovie = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { title, voteaverage, overview } = request.body
        const uuid = uuidv4()

        /** variable filename use to define of uploaded file name */
        let filename = ""
        if (request.file) filename = request.file.filename /** get file name of uploaded file */

        /** process to save new Movie, price and stock have to convert in number type */
        const newMovie = await prisma.movie.create({
            data: { uuid, title, voteaverage: voteaverage?.toString(), overview, picture: filename }
        })

        return response.json({
            status: true,
            data: newMovie,
            message: `New Movie has created`
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

export const updateMovie = async (request: Request, response: Response) => {
    try {
        /** get id of Movie's id that sent in parameter of URL */
        const { id } = request.params
        /** get requested data (data has been sent from request) */
        const { title, voteaverage, overview  } = request.body

        /** make sure that data is exists in database */
        const findMovie = await prisma.movie.findFirst({ where: { id: Number(id) } })
        if (!findMovie) return response
            .status(200)
            .json({ status: false, message: `Movie is not found` })

        /** default value filename of saved data */
        let filename = findMovie.picture
        if (request.file) {
            /** update filename by new uploaded picture */
            filename = request.file.filename
            /** check the old picture in the folder */
            let path = `${BASE_URL}/../public/movie_picture/${findMovie.picture}`
            let exists = fs.existsSync(path)
            /** delete the old exists picture if reupload new file */
            if (exists && findMovie.picture !== ``) fs.unlinkSync(path)
        }

        /** process to update Movie's data */
        const updatedMovie = await prisma.movie.update({
            data: {
                title: title || findMovie.title,
                voteaverage: voteaverage ? voteaverage.toString() : findMovie.voteaverage,
                overview: overview || findMovie.overview,
                picture: filename
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updatedMovie,
            message: `Movie has updated`
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

export const deleteMovie = async (request: Request, response: Response) => {
    try {
        /** get id of Movie's id that sent in parameter of URL */
        const { id } = request.params

        /** make sure that data is exists in database */
        const findMovie = await prisma.movie.findFirst({ where: { id: Number(id) } })
        if (!findMovie) return response
            .status(200)
            .json({ status: false, message: `Movie is not found` })

        /** check the old picture in the folder */
        let path = `${BASE_URL}/../public/movie_picture/${findMovie.picture}`
        let exists = fs.existsSync(path)
        /** delete the old exists picture if reupload new file */
        if (exists && findMovie.picture !== ``) fs.unlinkSync(path)

        /** process to delete Movie's data */
        const deletedMovie = await prisma.movie.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deletedMovie,
            message: `Movie has deleted`
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