import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionHandlerFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const exceptionObj = host.switchToHttp();

    const request = exceptionObj.getRequest<Request>()
    const response = exceptionObj.getResponse<Response>();

    // Exercício 1: Melhorar Handler abaixo, otimizando código
    const status =
      exception instanceof HttpException ?
        exception.getStatus() :
        HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ?
        exception.message.error :
        'An Non-Http Internal Error Occured!';

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url
      });
  }
}
