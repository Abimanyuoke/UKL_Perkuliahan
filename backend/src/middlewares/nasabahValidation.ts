import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

/** create schema when add new menu's data, all of fileds have to be required */
const addDataSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).alphanum().required(),
    telepon: Joi.string().alphanum().required(),
    alamat: Joi.string().required(),
    gender: Joi.string().valid('PRIA', 'WANITA').uppercase().required(),
    profile_picture: Joi.allow().optional(),
    user: Joi.optional()
})

/** create schema when edit new menu's data, all of fileds have to be required */
const editDataSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).alphanum().required(),
    telepon: Joi.string().alphanum().required(),
    alamat: Joi.string().required(),
    gender: Joi.string().valid('PRIA', 'WANITA').uppercase().required(),
    profile_picture: Joi.allow().optional(),
    user: Joi.optional()
})

/** create schema when authentication */
const authSchema = Joi.object({
    username: Joi.string().required(),  
    password: Joi.string().min(3).alphanum().required(),
})

export const verifyAddUser = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(200).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyEditUser = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = editDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(200).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyAuthentication = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = authSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(200).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}