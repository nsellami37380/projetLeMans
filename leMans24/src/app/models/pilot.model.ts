import { Car } from "./car.model";
import { PilotPhoto } from "./PilotPhoto";
import { Team } from "./team.model";

export class Pilot{
    constructor(
        public id: number,
        public photoList: PilotPhoto[],
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public height: number,
        public palmares: string,
        public bio: string,
        public car?: Car,
        public team?: Team
        ) {

        
    }
}
	

