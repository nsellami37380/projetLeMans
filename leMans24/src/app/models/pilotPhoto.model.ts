import { Pilot } from "./pilot.model";

export class PilotPhoto{
    constructor(
        public id: string,
        public pilot: Pilot,
        public urlPhoto: string,
    ){}
}