declare class JWTAuth {
    createToken: (data: any) => {
        token: any;
    };
    readToken: (token: any) => any;
}
declare const _default: JWTAuth;
export default _default;
