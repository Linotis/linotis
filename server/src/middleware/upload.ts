import multer from 'multer';
import moment from 'moment';
import { Callback } from 'mongoose';

const storage = multer.diskStorage({
	destination(req, file, cb: Callback) {
		cb(null, 'src/uploads')
	},
	filename(req, file, cb) {
		const date = moment().format('DDMMYYYY-HHmmss_SSS');
		cb(null, `${date}-${file.originalname}`);
	}
});

const fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/png'){
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const limits = {
	fileSize: 1024 * 1024 *5
};

export default multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});