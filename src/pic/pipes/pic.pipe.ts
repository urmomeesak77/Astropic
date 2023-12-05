
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { PicUtil } from '../class/picutil.class';


@Injectable()
export class PicValidationPipe implements PipeTransform {
    async transform(code: string, { metatype }: ArgumentMetadata) {     
        try {
            new PicUtil().validate(code);
        }
        catch (e) {
            throw new BadRequestException('Validation failed: ' + e.message);
            
        }

        return code;
    }

}