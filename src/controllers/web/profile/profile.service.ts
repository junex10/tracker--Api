import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Level, Person, User, Petition } from "src/models";
import { Constants, Globals } from 'src/utils';
import {
    UpdateUserDTO
} from './profile.entity';
import * as fs from 'fs';
import * as moment from 'moment';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Person) private personModel: typeof Person,
        @InjectModel(Petition) private petitionModel: typeof Petition,
    ) {

    }

    update = async (request: UpdateUserDTO, file: Express.Multer.File) => {
        const user = await this.userModel.findOne({ where: { id: request.id } });
        if (file !== undefined && user?.photo !== null) {
            const PATH = `./public/storage/${user?.photo}`;
            if (fs.existsSync(PATH)) fs.unlinkSync(PATH);
        }
        const age = Globals.calculateAge(request.birthdate);
        const update = await this.userModel.update(
            {
                email: request.email,
                photo: file !== undefined ? ('users/' + file.filename) : user?.photo,
                level_id: request.level_id ?? user.level_id
            },
            {
                where: { id: request.id }
            }
        )
        if (update !== null) {
            await this.personModel.update(
                {
                    name: request.name,
                    lastname: request.lastname,
                    phone: request.phone,
                    address: request.address,
                    birthdate: request.birthdate !== null ? moment(request.birthdate).toDate() : '',
                    age,
                    medical_history: 0
                },
                {
                    where: { user_id: request.id }
                }
            );
            return await this.userModel.findOne(
                { 
                    include: [{
                        model: Level,
                        include: ['permissions']
                    }],
                    where: { id: request.id } 
                }
            );
        }

        return null;
    }
}
