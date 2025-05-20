import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

/** create schema when add new menu's data, all of fileds have to be required */
const addDataSchema = Joi.object({
    title: Joi.string().required(),
    voteaverage: Joi.number().min(0).required(),
    overview: Joi.string().required(),
    picture: Joi.allow().optional(),
    user: Joi.optional()
})

/** create schema when edit new menu's data, all of fileds have to be required */
const editDataSchema = Joi.object({
    title: Joi.string().optional(),
    voteaverage: Joi.number().min(0).optional(),
    overview: Joi.string().optional(),
    picture: Joi.allow().optional(),
    user: Joi.optional()
})


export const verifyAddMovie = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyEditMovie = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = editDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}