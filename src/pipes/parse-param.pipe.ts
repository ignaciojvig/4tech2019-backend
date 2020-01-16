import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseParamPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const parsedParam = parseInt(value, 10);
    if (isNaN(parsedParam)) { throw new BadRequestException('Bad Param was given!'); }

    return parsedParam;
  }
}
