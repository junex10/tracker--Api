declare class Globals {
    formatMiles: (n: any, decimals?: boolean, currency?: string) => string;
    filterByUrl: (url: string) => string;
    calculateAge: (birthdate: Date | string) => number;
    randomInt: (min: number, max: number) => number;
    getTokenByLevel: (level: number) => {};
}
declare const _default: Globals;
export default _default;
