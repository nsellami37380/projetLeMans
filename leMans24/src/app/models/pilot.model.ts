import { Car } from "./car.model";
import { PilotPhoto } from "./pilotPhoto.model";
import { Team } from "./team.model";

export class Pilot{
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public photoList: PilotPhoto[],
        public dateOfBirth: Date,
        public palmares: string,
        public bio: string,
        public car: Car,
        public team: Team,
        public height?: number,
        ) {

        
    }
}
	

