import express from "express"
import {getAllNasabah, getNasabahById, createNasabah, authentication } from "../controllers/nasabahController"
import { verifyAddUser, verifyEditUser, verifyAuthentication } from "../middlewares/nasabahValidation"
import uploadFile from "../middlewares/profilUpload"
import { verifyToken, verifyRole } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/`, getAllNasabah)
app.get(`/profile`, getNasabahById)
app.post(`/api/register`, uploadFile.single("picture"), verifyAddUser, createNasabah)
// app.post(`/`, [verifyToken, verifyRole(["MANAGER"]), uploadFile.single("picture"), verifyAddUser], createUser)
// app.put(`/:id`,  verifyEditUser, updateUser)
// app.put(`/profile/:id`, [verifyToken, verifyRole(["CASHIER", "MANAGER"]), uploadFile.single("picture")], changePicture)
// app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteUser)
app.post(`/login`, [verifyAuthentication], authentication)

export default app