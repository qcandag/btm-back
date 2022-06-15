import {
    Prop, Schema, SchemaFactory
} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { UserStatus } from 'src/modules/enum/user-status.enum';
import { UserAct } from 'src/modules/enum/user-act.enum';
import { CrewStat } from 'src/modules/enum/crew-stat.enum';

export type UserDocument = User & Document;

@Schema({
    timestamps: true
})
export class User {

    @Prop({
        required: true,
        unique: true,
        type: String,
        select: false
    })
        phone: string;

    @Prop({
        type: String
    })
        mail: string;

    @Prop({
        type: String,
        required: true,
    })
        status: UserStatus;

    @Prop({
        type: String,
        required: true,
    })
    password: string;

    @Prop({
        type: String,
        required: true,
    })
    useract: UserAct.ACTIVE;

    @Prop({
        type: String,
    })
    crewname: string;

    @Prop({
        type: String,
    })
    crewstat: CrewStat;


    // Only for users that are crew members
    @Prop({
        type: String,
    })
    salary: string;

    @Prop({
        type: String,
    })
    jobtitle: string;

    @Prop({
        type: String,
    })
    age: string;



}


// const addMemberSchema = new mongoose.Schema({
//     phone: {
//         type: String,
//         required: true,
//     },
//     mail: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//     },

//     useract: String,

//     crewstat: String
// })

// export const AddMemberSchema =  mongoose.model('memberreq', addMemberSchema);
export const UserSchema = SchemaFactory.createForClass(User);
