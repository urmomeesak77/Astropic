import { Person,Gender } from './person.class';
import { DateUtil } from './dateutil.class';


export class PicUtil {
    private dateUtil: DateUtil = new DateUtil;

    validate(code: string):boolean {
        let regex = new RegExp("^[1-8][0-9]{10}");
        if (!regex.test(code)) {
            throw new Error("Invalid personal indentification code syntax");
        }
        if (code.charAt(10) != this.getCheckSumForCode(code).toString()) {
            throw new Error("Invalid personal indentification code check sum");
        }

        let dob = this.getDobFromCode(code);
        if (!this.dateUtil.validate(dob)) {            
            throw new Error("Invalid personal indentification code dob");
        }
        return true; 
    }

    getSexFromCode(code: string) {
        return Number(code.charAt(0)) % 2 == 0 ? Gender.Female : Gender.Male;
    }

    getDobFromCode(code:string) {
        let first = Number(code.charAt(0));
        let year = (Math.ceil(first / 2) + 17) * 100 + Number(code.substring( 1, 3))
        let dateParts = [
            year.toString(),
            code.substring( 3, 5),
            code.substring( 5, 7) 
        ]

        return dateParts.join("-");
    }   

    getSequenceFromCode(code: string) {
        return code.substring(7, 10);
    }

    generateForPerson(person: Person, sequence: number = 1) {
        this.validatePerson(person);
        let codeParts = [
            this.getGenderAndCenturyPart(person), 
            this.getDatePart(person),
            sequence.toString().padStart(3, "0")
        ];
        codeParts.push(
            this.getCheckSumForCode(codeParts.join("")).toString()
        );
        return codeParts.join("");
    }

    getGenderAndCenturyPart(person: Person) {
        let offset = person.gender.toUpperCase() == Gender.Male ? 1 : 0;
        let year = new Date(person.dob).getFullYear();

        let s = Math.floor(year / 100) - 17;
        return (s * 2 - offset).toString();
    }

    getDatePart(person: Person) {
        let date = new Date(person.dob);
        let dateParts = [
            date.getFullYear().toString().substring(2, 4),
            (date.getMonth() + 1).toString().padStart(2, "0"),
            date.getDate().toString().padStart(2, "0")
        ]
        let code = dateParts.join("");
        return code;
    }

    validatePerson(person: Person) {
        if (!Object.values<string>(Gender).includes(person.gender.toUpperCase())) {
            throw new Error("Invalid gender");
        }
        if (!this.dateUtil.validate(person.dob)) {
            throw new Error("Invalid dob");
        }

        let year = new Date(person.dob).getFullYear();
        if (year < 1800 || year > 2199) {
            throw new Error("Dob is out of range");
        }
    }

    getCheckSumForCode(code: string) {        
        code = code.substring(0, 10);

        const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
        const weights2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

        let weightSum = this.calcCheckSumByWeights(code, weights1);
        let mod = weightSum % 11;
        if (mod < 10) {
            return mod;
        }
        weightSum = this.calcCheckSumByWeights(code, weights2);
        mod = weightSum % 11;
        return mod < 10 ? mod :0;
    }

    calcCheckSumByWeights(code: string, weights: number[]) {
        let chkSum = 0;
        for (var i = 0; i < 10; i++) {
            let num = Number(code.charAt(i));
            chkSum += num * weights[i];
        }
        return chkSum;
    }
}