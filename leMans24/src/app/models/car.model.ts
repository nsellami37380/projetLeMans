import { CarPhoto } from "./carPhoto.model";
import { Pilot } from "./pilot.model";
import { Team } from "./team.model";

export class Car{

    constructor(
        public id: number, 
        public carPhotoList: CarPhoto[],
        public modelName: string,
        public engine: string,
        public power: number,
        public maxSpeed: number,
        public acceleration: number,
        public bio:string,
        public team?: Team,
        public pilot?: Pilot
    ) {
        
    }
}