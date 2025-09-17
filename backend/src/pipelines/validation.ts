import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodObject } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const error = result.error.issues[0].message;
      throw new BadRequestException(error);
    }
    return result.data;
  }
}
