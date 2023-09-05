import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
declare const MAIL_CONFIG: {
    transport: {
        host: string;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
    defaults: {
        from: string;
    };
    template: {
        dir: string;
        adapter: HandlebarsAdapter;
        options: {
            strict: boolean;
        };
    };
};
export { MAIL_CONFIG };
