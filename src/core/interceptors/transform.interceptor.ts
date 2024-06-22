import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { classToPlain, instanceToPlain } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    logger: Logger = new Logger('TransformInterceptor');
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    this.logger.verbose('TransformInterceptor');
    return next.handle().pipe(map(data => instanceToPlain(data)));
  }
}