import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { isArray } from 'util';

@Catch(Error)
export class ExceptionHandlerFilter<Error> implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const argumentsObj = host.switchToHttp();

    const request = argumentsObj.getRequest<Request>();
    const response = argumentsObj.getResponse<Response>();

    // Exercício 1: Melhorar Handler abaixo, otimizando código
    const status =
      exception instanceof HttpException ?
        exception.getStatus() :
        HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ?
        (isArray(exception.message.message) ?
          'Errors were found in the Model' : exception.message.message) :
        exception.message;

    const type =
      exception instanceof HttpException ?
        exception.message.error :
        exception.name;

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        type: type,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
