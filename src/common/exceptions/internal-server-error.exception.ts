import { HttpStatus, MessageCode } from '@common/enums';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class InternalServerErrorException extends HttpException {
  constructor(message?: ExceptionMessage) {
    super({
      messageCode: MessageCode.INTERNAL_SERVER_ERROR,
      statusCode: HttpStatus.InternalServerError,
      message: message || i18n()['exception.serverError'],
    });
  }
}
