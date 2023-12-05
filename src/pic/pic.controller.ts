import { Controller,Body, Post, Get, Param } from '@nestjs/common';
import { Person } from './class/person.class';
import { PicService } from './pic.service';
import { SchemaValidationPipe } from './pipes/schema.pipe';
import { PersonValidationPipe } from './pipes/person.pipe';
import { PicValidationPipe } from './pipes/pic.pipe';


@Controller('pic')
export class PicController {    
    constructor(private readonly picService: PicService) {  }

    @Post()
    async create(@Body(new SchemaValidationPipe(), new PersonValidationPipe()) person: Person) {
        return this.picService.createNewPic(person);
    }
    
    @Get()
    async findAlln() {
       return this.picService.findAll();
    }

    @Get(':id')
    async gePicInfo(@Param('id', new PicValidationPipe()) code: string) {
       return this.picService.gePicInfo(code);
    }
}