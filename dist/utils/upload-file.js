"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = void 0;
const multer_1 = require("multer");
const hash_1 = require("./hash");
const moment = require("moment");
const UploadFile = (folderName) => {
    return {
        storage: (0, multer_1.diskStorage)({
            destination: `./public/storage/${folderName}/`,
            filename: (req, file, cb) => {
                let format = '';
                switch (file.mimetype) {
                    case 'image/jpeg':
                        format = 'jpg';
                        break;
                    case 'image/png':
                        format = 'png';
                        break;
                    case 'image/png':
                        format = 'png';
                        break;
                    case 'video/mp4':
                        format = 'mp4';
                        break;
                    case 'video/x-msvideo':
                        format = 'avi';
                        break;
                    case 'video/x-ms-wmv':
                        format = 'wmv';
                        break;
                    case 'video/quicktime':
                        format = 'mov';
                        break;
                    case 'video/3gpp':
                        format = '3gp';
                        break;
                    case 'video/x-flv':
                        format = 'flv';
                        break;
                    case 'image/gif':
                        format = 'gif';
                        break;
                    case 'application/pdf':
                        format = 'pdf';
                        break;
                    default:
                        format = 'jpg';
                        break;
                }
                return cb(null, `${hash_1.default.makeSync(file.originalname + moment().format('YYYYMMDDHHmmss'))
                    .replace(/\//g, '')
                    .replace(/\./g, '')
                    .replace(/,/g, '')}.${format}`);
            }
        })
    };
};
exports.UploadFile = UploadFile;
//# sourceMappingURL=upload-file.js.map