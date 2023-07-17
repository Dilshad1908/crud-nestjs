import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student';
import { IStudent } from 'src/interface/student.interface';

@Injectable()
export class StudentService {

    constructor(@InjectModel('Student') private studentModel:Model<IStudent>){}

    // creating a new student in data base

    async createStudent(createStudentDto:CreateStudentDto):Promise<IStudent>{
        const newStudent= await new this.studentModel(createStudentDto)
        return newStudent.save() ////// save a nes student
    }

    /////  getting all students data

    async getAllStudents():Promise<IStudent[]>{
        const studentsData= await  this.studentModel.find();
        if(!studentsData || studentsData.length==0){
            throw new NotFoundException('Studetns data not found')
        }
        return studentsData;
        
    }
    
    ///// getting specific student by id //////
    
    async getStudent(studentId:string):Promise <IStudent>{
        const existingStudent= await this.studentModel.findById(studentId)
        if(!existingStudent){
            throw new NotFoundException(`student with id :${studentId} not found  !!!! `)
        }
        return existingStudent
    }

    ////// Delete specific student data by id ////////

    async deletStudent(studentId:string):Promise<IStudent>{
        const deletedStudent= await this.studentModel.findByIdAndDelete(studentId)
        if(!deletedStudent){
            throw new NotFoundException(`student with id :${studentId} does not exist`)
        }
        return deletedStudent
    }

    ///////// Updating students data using it's id /////////

    async updateStudent(studentId:string, updateStudentDto:UpdateStudentDto):Promise<IStudent>{
        const existingStudent= await this.studentModel.findByIdAndUpdate(studentId,updateStudentDto,{new:true});
        if(!existingStudent){
            throw new NotFoundException(`student with id :${studentId} not found  !!!! `)
        }
        return existingStudent
    }

}
