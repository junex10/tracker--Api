import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor();
    catch(exception: any, host: ArgumentsHost): void;
    private errorLog;
    private dateString;
}
declare const _default: HttpExceptionFilter;
export default _default;
