/// <reference types="multer" />
declare const UploadFile: (folderName: string) => {
    storage: import("multer").StorageEngine;
};
export { UploadFile };
