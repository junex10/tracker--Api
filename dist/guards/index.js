"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretaryGuard = exports.DoctorGuard = exports.BossGuard = exports.GeneralGuard = exports.PatientGuard = exports.AdminGuard = void 0;
const admin_guard_1 = require("./admin.guard");
Object.defineProperty(exports, "AdminGuard", { enumerable: true, get: function () { return admin_guard_1.AdminGuard; } });
const patient_guard_1 = require("./patient.guard");
Object.defineProperty(exports, "PatientGuard", { enumerable: true, get: function () { return patient_guard_1.PatientGuard; } });
const boss_guard_1 = require("./boss.guard");
Object.defineProperty(exports, "BossGuard", { enumerable: true, get: function () { return boss_guard_1.BossGuard; } });
const doctor_guard_1 = require("./doctor.guard");
Object.defineProperty(exports, "DoctorGuard", { enumerable: true, get: function () { return doctor_guard_1.DoctorGuard; } });
const secretary_guard_1 = require("./secretary.guard");
Object.defineProperty(exports, "SecretaryGuard", { enumerable: true, get: function () { return secretary_guard_1.SecretaryGuard; } });
const general_guard_1 = require("./general.guard");
Object.defineProperty(exports, "GeneralGuard", { enumerable: true, get: function () { return general_guard_1.GeneralGuard; } });
//# sourceMappingURL=index.js.map