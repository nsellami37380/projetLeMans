import { Pilot } from "./pilot.model";

export class PilotPhoto{
    constructor(
        
        public urlPhoto: String,
        public id?: number,
        public pilot?: Pilot

    ){}
}