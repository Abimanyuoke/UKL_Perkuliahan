import express from "express"
import { getAllMovies, createMovie, updateMovie, deleteMovie } from "../controllers/movieController"
import { verifyAddMovie, verifyEditMovie } from "../middlewares/movieValidation"
import { verifyRole, verifyToken } from "../middlewares/authorization"
import uploadFile from "../middlewares/movieUpload"

const app = express()
app.use(express.json())

app.get(`/admin/getmovie`, [verifyToken, verifyRole(["CASHIER", "ADMIN"])], getAllMovies)
app.post(`/admin/insertmovie`, [ uploadFile.single("picture"), verifyAddMovie], createMovie)
app.put(`/admin/updatemovie/:id`, [verifyToken, verifyRole(["ADMIN"]), uploadFile.single("picture"), verifyEditMovie], updateMovie)
app.delete(`/admin/hapusmovie/:id`, [verifyToken, verifyRole(["ADMIN"])], deleteMovie)

export default app