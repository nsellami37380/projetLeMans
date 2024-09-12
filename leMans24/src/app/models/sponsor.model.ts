import { Team } from "./team.model";

export class Sponsor{
    constructor(
        public id: number,
        public name: string,
        public urlLogo: string,
        public teamList: Team[]     
    ){}
}