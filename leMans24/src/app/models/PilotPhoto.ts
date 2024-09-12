import { Pilot } from "./pilot.model";

export class PilotPhoto{
    constructor(
        
        public urlPhoto: string,
        public id?: number,
        public pilot?: Pilot

    ){}
}