

import express from "express"
import { verifyToken, verifyRole } from "../middlewares/authorization"
import { verifyAddMovie } from "../middlewares/movieValidation"
import { addTransaksi, getAllTransaksi } from "../controllers/transaksiController"
import { getTransaksiByUser } from "../controllers/transaksiListController";

const app = express()
app.use(express.json())

app.get(`/user/history_trans`, [verifyToken, verifyRole(["ADMIN"])], getAllTransaksi)
app.get(`/user/getmovie`, [verifyToken, verifyRole(["USER"])], getTransaksiByUser)
app.post(`/kasir/transaksi`, verifyAddMovie, addTransaksi)


export default app