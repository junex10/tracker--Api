"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../../../models");
const utils_1 = require("../../../utils");
const sequelize_2 = require("sequelize");
let ChatService = class ChatService {
    constructor(userModel, chatModel, chatSessionModel, chatUsersModel) {
        this.userModel = userModel;
        this.chatModel = chatModel;
        this.chatSessionModel = chatSessionModel;
        this.chatUsersModel = chatUsersModel;
        this.getChats = async (request) => {
            var e_1, _a;
            const chats = await this.chatUsersModel.findAll({
                where: {
                    user_id: request.user_id
                },
                include: [{ model: models_1.ChatSession }]
            });
            const sessions = chats.map(item => (item.chat_session.id));
            const getOtherUser = await this.chatUsersModel.findAll({
                where: {
                    user_id: {
                        [sequelize_2.Op.ne]: request.user_id
                    },
                    chat_session_id: {
                        [sequelize_2.Op.in]: sessions
                    }
                },
                include: [{
                        model: models_1.User,
                        attributes: ['email', 'id', 'photo'],
                        include: [{ model: models_1.Person, attributes: ['name', 'lastname'] }]
                    }, 'chat_session']
            });
            let data = [];
            try {
                for (var getOtherUser_1 = __asyncValues(getOtherUser), getOtherUser_1_1; getOtherUser_1_1 = await getOtherUser_1.next(), !getOtherUser_1_1.done;) {
                    const item = getOtherUser_1_1.value;
                    const lastMessage = await this.chatModel.findOne({
                        where: {
                            chat_session_id: item.chat_session.id
                        },
                        order: [['id', 'desc']]
                    });
                    data.push({
                        item,
                        lastMessage: lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.message,
                        lastDateMessage: lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.created_at
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (getOtherUser_1_1 && !getOtherUser_1_1.done && (_a = getOtherUser_1.return)) await _a.call(getOtherUser_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return data;
        };
        this.newChat = async (request) => {
            var e_2, _a;
            var _b;
            const chats = await this.getChats({ user_id: request.sender_id });
            const session = chats.map(value => (value.item.chat_session_id));
            const searchChats = await this.chatUsersModel.findAll({
                where: {
                    chat_session_id: {
                        [sequelize_2.Op.in]: session
                    }
                }
            });
            const ignoreChats = searchChats
                .map((item) => { var _a; return ((((_a = item) === null || _a === void 0 ? void 0 : _a.user_id) !== request.sender_id) && item); })
                .filter(x => x !== false);
            try {
                for (var ignoreChats_1 = __asyncValues(ignoreChats), ignoreChats_1_1; ignoreChats_1_1 = await ignoreChats_1.next(), !ignoreChats_1_1.done;) {
                    const item = ignoreChats_1_1.value;
                    const value = (_b = item) === null || _b === void 0 ? void 0 : _b.user_id;
                    if (value === request.receiver_id) {
                        return null;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (ignoreChats_1_1 && !ignoreChats_1_1.done && (_a = ignoreChats_1.return)) await _a.call(ignoreChats_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            const chatSession = await this.chatSessionModel.create({
                host_id: request.sender_id,
                name: request.name
            });
            if (chatSession) {
                if (request.receiver_id) {
                    await this.chatUsersModel.create({
                        chat_session_id: chatSession.id,
                        user_id: request.receiver_id,
                        viewed: utils_1.Constants.CHATS.VIEWED.UNREAD
                    });
                }
                await this.chatUsersModel.create({
                    chat_session_id: chatSession.id,
                    user_id: request.sender_id,
                    viewed: utils_1.Constants.CHATS.VIEWED.UNREAD
                });
                return chatSession;
            }
            return null;
        };
        this.newMessage = async (request, files) => {
            const chat = await this.chatModel.create({
                chat_session_id: request.session_id,
                sender_id: request.sender_id,
                message: request.message
            });
            if (chat) {
                if (files.length > 0) {
                    const attachment = files.map(item => ({ chat_id: chat.id, attachment: `chat/${item.filename}` }));
                }
                await this.chatUsersModel.update({
                    viewed: utils_1.Constants.CHATS.VIEWED.UNREAD
                }, {
                    where: {
                        chat_session_id: request.session_id,
                        user_id: {
                            [sequelize_2.Op.ne]: request.sender_id
                        }
                    }
                });
                return chat;
            }
            return null;
        };
        this.getLogs = async (request) => {
            const logs = await this.chatModel.findAll({ where: { chat_session_id: request.chat_session_id }, include: ['attachments_chats'] });
            const chat = await this.chatSessionModel.findOne({ where: { id: request.chat_session_id } });
            return {
                logs,
                photo: chat.attachment
            };
        };
        this.delete = async (request) => {
            const host = await this.chatSessionModel.findOne({
                where: {
                    id: request.chat_session_id,
                    host_id: request.host_id
                }
            });
            if (host) {
                const chat = await this.chatModel.destroy({ where: { chat_session_id: request.chat_session_id } });
                if (chat) {
                    await this.chatUsersModel.destroy({ where: { chat_session_id: request.chat_session_id } });
                    await this.chatSessionModel.destroy({ where: { id: request.chat_session_id } });
                    return true;
                }
                return false;
            }
        };
        this.viewed = async (request) => {
            const chatViewed = await this.chatUsersModel.update({
                viewed: utils_1.Constants.CHATS.VIEWED.READED
            }, {
                where: {
                    chat_session_id: request.chat_session_id,
                    user_id: request.user_id
                }
            });
            if (chatViewed)
                return true;
            return false;
        };
        this.getUsers = () => {
            return this.userModel.findAll({
                where: { level_id: utils_1.Constants.LEVELS.DOCTOR },
                include: [{
                        model: models_1.Level,
                        attributes: ['name']
                    }, {
                        model: models_1.Person,
                        attributes: ['id', 'name', 'lastname']
                    }],
                attributes: ['id', 'photo']
            });
        };
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(models_1.Chats)),
    __param(2, (0, sequelize_1.InjectModel)(models_1.ChatSession)),
    __param(3, (0, sequelize_1.InjectModel)(models_1.ChatUsers)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map