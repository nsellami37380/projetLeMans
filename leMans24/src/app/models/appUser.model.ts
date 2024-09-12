import { ERole } from "./enum/ERole.enum";

export class AppUser {

    constructor(
        public roleList: ERole[],
        public username : string,
        public expiration: number
        ){

    }
}