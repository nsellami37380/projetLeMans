import { Team } from "./team.model";

export class Pilot{
    constructor(
        public id: number,
        public photoList: string[],
        public firstName: string,
        public lastName: string,
        public birthday: Date,
        public height: number,
        public team: Team,
        public palmares: string,
        public bio: string
        ) {

        
    }
}
	

