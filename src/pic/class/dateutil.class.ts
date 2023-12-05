export class DateUtil {

    validate(dateStr: string): boolean {
        let date = new Date(dateStr);
        return dateStr == this.getDateStr(date);
    }

    getDateStr(date: Date) {
        let dateParts = [
            date.getFullYear().toString(),
            (date.getMonth() + 1).toString().padStart(2, "0"),
            date.getDate().toString().padStart(2, "0")
        ]
        return dateParts.join("-");
    }
}