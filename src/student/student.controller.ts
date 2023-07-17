import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { response } from 'express';
import { UpdateStudentDto } from 'src/dto/update-student';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService:StudentService){}

        /////// creating new student data in daa base /////////

    @Post()
    async createStudent(@Res() response,  @Body() createStudent:CreateStudentDto){
        try{
            const newStudent= await this.studentService.createStudent(createStudent)
            return response.status(HttpStatus.CREATED).json({
                message:"student created successfully", newStudent
            })

        }catch{
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode:400,
                message:'student not created',
                error:'Bad request'
            })
        }
    }


    ///// getting all the students data //////

    @Get()
    async getStudents(@Res() response){
        try{

            const studentData= await this.studentService.getAllStudents()
            return response.status(HttpStatus.OK).json({
                message:'All students data found succsfully',studentData

            })
        }catch(err){
            return response.status(err.status).json(err.response)
        }
    }

    ///// updating data ///////

    @Put('/:id')
    async updateStudent(@Res() response, @Body() updateStudent:UpdateStudentDto, @Param('id') studentId:string){
        try{
            const updatedStudent= await this.studentService.updateStudent(studentId,updateStudent)
            
        return response.status(HttpStatus.OK).json({
            message:'Data has been succesfully updated', updatedStudent
        })
        }catch(err) {
            return response.status(err.status).json(err.response)
        }
    }

    //// Delete the student data //////

    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') studentId:string){
        try{
            const deletedStudent= await this.studentService.deletStudent(studentId);
            return response.status(HttpStatus.OK).json({
                message:'Student deleted successfully', deletedStudent
            })
        }catch(err){
            return response.status(err.status).json(err.response)

        }
    }

    ////// getting specific  student by id /////

    @Get('/:id')
    async getStudent(@Res() response, @Param('id') studentId:string){
        try{
            const student= await this.studentService.getStudent(studentId)
            return response.status(HttpStatus.OK).json({
                message:'student found succesfully', student
            })

        }catch(err){
            return response.status(err.status).json(err.response)
        }

    }
    
}
