import express from 'express'
import { createMatkul, getMatkul, selectMatkul } from '../controllers/matkulController'

const router = express.Router()

router.get('/getmatkul', getMatkul)
router.post('/selectmatkul', selectMatkul)
router.post('/addmatkul', createMatkul)

export default router
