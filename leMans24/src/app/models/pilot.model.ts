import { Team } from "./team.model";

export class Pilot{
    constructor(
        public id: number,
        public picture: string,
        public firstName: string,
        public lastName: string,
        public birthday: Date,
        public height: number,
        public team: number,
        public palmares: string,
        public bio: string
        ) {

        
    }
}
	

