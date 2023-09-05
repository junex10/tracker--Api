declare enum COMPANY_INFORMATION {
    NAME = "ClinicaSBV",
    ID = 1,
    DESCRIPTION = "Sistema para consultoria y administraci\u00F3n de la clinica"
}
declare enum LEVELS {
    ADMIN = 1,
    BOSS = 2,
    DOCTOR = 3,
    SECRETARY = 4,
    PATIENT = 5
}
declare enum PASSWORD_RESET_STATUS {
    ACTIVE = 1,
    INACTIVE = 0
}
declare const _default: {
    COMPANY_INFORMATION: typeof COMPANY_INFORMATION;
    LEVELS: typeof LEVELS;
    PASSWORD_RESET_STATUS: typeof PASSWORD_RESET_STATUS;
    TOKENS: {
        KEY: string;
        LEVEL: LEVELS;
    }[];
    USER: {
        USER_VERIFIED: {
            VERIFIED: number;
            NO_VERIFIED: number;
        };
        LOGGED_IN: {
            IN: number;
            OUT: number;
        };
        PERSON: {
            MEDICAL_HISTORY: {
                AVAILABLE: number;
                DISABLED: number;
            };
        };
    };
    NOTIFICATIONS: {
        STATUS: {
            READED: number;
            UNREADED: number;
        };
    };
    PER_PAGE: number;
    PER_PAGE_WEB: number;
    ACTIONS: {
        MAIN: number;
        NO_MAIN: number;
    };
    MODULES: {
        PROFILE: string;
        PATIENTS: {
            APPOINTMENTS: string;
        };
        CHATS: string;
        DOCTOR: {
            VIEW_APPOINTMENTS: string;
        };
        ADMIN: {
            VIEW_STATISTICS: string;
        };
    };
    PETITIONS: {
        ADD_ASSOCIATED: number;
    };
    DAYS: {
        MONDAY: number;
        TUESDAY: number;
        WEDNESDAY: number;
        THURSDAY: number;
        FRIDAY: number;
        SATURDAY: number;
        SUNDAY: number;
    };
    MEDICAL_APPOINTMENTS: {
        STATUS: {
            PENDING_CONFIRM: {
                CODE: number;
                TEXT: string;
            };
            APPROVED: {
                CODE: number;
                TEXT: string;
            };
            REJECTED: {
                CODE: number;
                TEXT: string;
            };
            ENDED: {
                CODE: number;
                TEXT: string;
            };
            DISCONTINUED: {
                CODE: number;
                TEXT: string;
            };
        };
    };
    CHATS: {
        VIEWED: {
            READED: number;
            UNREAD: number;
        };
    };
};
export default _default;
