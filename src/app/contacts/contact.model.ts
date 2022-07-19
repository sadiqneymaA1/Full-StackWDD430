// this is the model for the contact class, we will use it for the database
export class Contact {
    constructor(
        public _id: string,
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public imageUrl: string,
        public group: Contact[]
    ) { }
}