import { Car } from "./car.model";

export class CarPhoto{
    constructor(
        public id: number,
        public car: Car,
        public urlPhoto: string,
    ){

    }

}