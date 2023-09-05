"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const moment = require("moment");
const common_1 = require("@nestjs/common");
const utils_1 = require("./utils");
Date.prototype.toJSON = function () {
    return moment(this).format('YYYY-MM-DD HH:mm:ss');
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle(utils_1.Constants.COMPANY_INFORMATION.NAME)
        .setDescription(utils_1.Constants.COMPANY_INFORMATION.DESCRIPTION)
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => {
            return new common_1.UnprocessableEntityException({
                error: Object.values(errors[0].constraints)[0]
            });
        }
    }));
    app.useGlobalFilters(utils_1.HttpExceptionFilter);
    await app.listen(process.env.PORT);
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}
bootstrap();
//# sourceMappingURL=main.js.map