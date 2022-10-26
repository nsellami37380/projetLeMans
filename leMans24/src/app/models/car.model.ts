import { Team } from "./team.model";

export class Car{

    constructor(

        public id: number, 
        public pictureList: string[],
        public modelName: string,
        public color: string,
        public engine: string,
        public power: number,
        public maxSpeed: number,
        public tire : string,
        public team: number,
        public acceleration: number,
        public description:string

    ) {
        
    }
}