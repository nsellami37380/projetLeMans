export class ContactForm{
    constructor(
       public lastname:string,
       public firstname:string,
       public email: string,
       public claim: string,
       public status?: string
    ){}
}