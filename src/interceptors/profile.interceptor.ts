import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTAuth, Constants } from 'src/utils';

@Injectable()
export class ProfileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auth = context.getArgs()[0]?.headers?.authorization;
    if (auth !== '' && auth !== undefined) {
      const jwt = JWTAuth.readToken(auth)?.permissions;
      const main = jwt.filter(x => (x.actions.main === Constants.ACTIONS.MAIN) && (x.actions.code === Constants.MODULES.PROFILE));
      if (main.length === 0) {
        throw new ForbiddenException('Acceso denegado, no hay suficientes permisos para realizar esta acción');
      }
    }
    return next.handle();
  }
}