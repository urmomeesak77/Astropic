import { Injectable } from '@nestjs/common';
import { Person } from './class/person.class';
import { PicUtil } from './class/picutil.class';
import {  ConflictException } from '@nestjs/common';

@Injectable()
export class PicService {

    private readonly knownPics: string[] = [];
    private picUtil: PicUtil = new PicUtil;

    createNewPic(person: Person) {
        let sequence = 1;
        var code;

        do {
            code = this.picUtil.generateForPerson(person, sequence);
            let s = this.knownPics.find(item => item == code);
            if (this.findOne(code) === undefined) {
                this.knownPics.push(code);
                break;                
            }
            sequence++;
            if (sequence > 999) {
                throw new ConflictException('Out of sequences.');
            }
        }
        while (true);

        return {
            code: code,
        }
    }

    findOne(code: string) {
        return this.knownPics.find(item => item == code)
    }

    findAll(): string[] {
        return this.knownPics;
    }

    gePicInfo(code: string) {
        try {
            this.picUtil.validate("38002292228");
        }
        catch (e) {
            return {};
        }
        return {
            sex: this.picUtil.getSexFromCode(code),
            dob: this.picUtil.getDobFromCode(code),
            sequence: this.picUtil.getSequenceFromCode(code),
        }
       
    }

    generatePic(person: Person, countr: number  = 1) {
        let date = new Date(person.dob);

    }

}
