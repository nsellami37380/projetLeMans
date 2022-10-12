import { Team } from "./team.model";

export class Pilot{
    constructor(
        public id: number,
        public photo: string[],
        public firstName: string,
        public lastName: string,
        public birthday: Date,
        public age: number,
        public height: number,
        public team: Team,
        public palmares: string,
        public bio: string
        ) {

        
    }
}
	

