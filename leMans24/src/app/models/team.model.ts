import { Car } from "./car.model"
import { Pilot } from "./pilot.model"
import { Sponsor } from "./sponsor.model"

export class Team{

    constructor(
        public id: number,
        public name: string,
        public logo: string,
        public budget: number,
        public bio: string,
        public pilotList: Pilot[],
        public carList: Car[],
        public sponsorList: Sponsor[],
    ) {        
    }
}








