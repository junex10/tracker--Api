declare class QrCode {
    generate: (data: string, options?: {}) => Promise<{
        path: string;
        filename: string;
    }>;
    generateBase64: (data: string) => Promise<any>;
}
declare const _default: QrCode;
export default _default;
