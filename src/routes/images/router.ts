import express from 'express';
import multer from 'multer';
import { join } from 'path';
import { statusRequestValidation } from './validations/file_status.schema';
import { uploadFileValidation } from './validations/upload_file.schema';
import { uploadFileController } from './controllers/upload_file.controller';
import { fileStatusController } from './controllers/file_status.controller';
import { downloadFileRequestValidation } from './validations/download_file.schema';
import { downloadFileController } from './controllers/download_file.controller';
import { fileUploadLimiter } from './middlewares/fileUploadLimiter.middleware';
import { checkAuth } from '../auth/middlewares/checkAuth.middleware';

const upload = multer({ dest: join(__dirname, '..', '..', '..', 'uploads') });
const router = express.Router();

router.use(checkAuth);
router.use(fileUploadLimiter);

router.post(
  '/upload',
  upload.single('photo'),
  uploadFileValidation,
  uploadFileController
);
router.get('/:file_id/status', statusRequestValidation, fileStatusController);
router.get('/:file_id', downloadFileRequestValidation, downloadFileController);

export { router };
