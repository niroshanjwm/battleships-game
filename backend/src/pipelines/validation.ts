import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodObject } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const firstError = result.error.issues[0];
      console.log(`${Date()} Error in validation pipeline`, firstError, value);
      const error = firstError.message;
      throw new BadRequestException(error);
    }
    return result.data;
  }
}
