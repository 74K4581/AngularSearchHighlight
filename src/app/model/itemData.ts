export class ItemData {

    name: string = "";
    dateTime: Date;
    comment: string = "";

    constructor(name: string, dateTime: Date, comment: string) {
        this.name = name;
        this.dateTime = dateTime;
        this.comment = comment;
    }
}
