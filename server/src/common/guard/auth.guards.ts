import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs"

@Injectable()
export class AtGuard extends AuthGuard('access') {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // check handler first  and then check class  for 'isPublic'  
        // if not found return false
        const isPublic = this.reflector?.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()])
        if (isPublic) return true;
        return super.canActivate(context)
    }
}