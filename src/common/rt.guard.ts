import { AuthGuard } from "@nestjs/passport";

export class RtGuard extends AuthGuard('jwt-refresh') {
    constructor(){
        super();

        // console.log("test refresh")
    }

    
}