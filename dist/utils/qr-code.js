"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QRCode = require("qrcode");
const _1 = require(".");
class QrCode {
    constructor() {
        this.generate = async (data, options = {}) => {
            const QrOptions = Object.assign(Object.assign({}, options), { width: 400, height: 400, light: '#000' });
            const generatedName = (0, _1.GenerateName)('jpg');
            const path = `qr-code/${generatedName}`;
            const filename = `./public/storage/qr-code/${generatedName}`;
            await QRCode.toFile(filename, data, QrOptions);
            return {
                path,
                filename: generatedName
            };
        };
        this.generateBase64 = async (data) => await QRCode.toDataURL(data);
    }
}
exports.default = new QrCode();
//# sourceMappingURL=qr-code.js.map