
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Person } from '../class/person.class';


@Injectable()
export class PersonValidationPipe implements PipeTransform {
    async transform(person: Person, { metatype }: ArgumentMetadata) {
        let dob = new Date(person.dob);
        let date = new Date();

        if (dob.getFullYear() < 1800 || dob.getFullYear() > 2199) {            
            throw new BadRequestException('Validation failed: dob is out of range');
        }

        return person;
    }
}