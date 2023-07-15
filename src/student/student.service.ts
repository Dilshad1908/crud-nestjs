import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from 'src/interface/student.interface';

@Injectable()
export class StudentService {

    constructor(@InjectModel('Student') private studentModel:Model<IStudent>){}

    // creating data in dada base

}
