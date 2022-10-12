import { Car } from "./car.model"
import { Pilot } from "./pilot.model"

export class Team{

    constructor(
        public id: number,
        public name: string,
        public logo: string,
        public pilotList: Pilot[],
        public carList: Car[],
        public budget: number,
        public story: string
    ) {        
    }
}








