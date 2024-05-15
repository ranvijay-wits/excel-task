import Router from 'express';
const router = Router();
import upload from '../middlewares/upload-csv-file';


const dataController = require('../controllers/data')



router.post('/upload', upload.single('csvFile'), dataController.uploadFile)

router.get('/fetch-data/:page', dataController.fetchAllData)


export default router;