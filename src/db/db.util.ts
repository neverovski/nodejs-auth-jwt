import { DatabaseError } from 'pg';

import {
  ConflictException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@common/exceptions';
import { i18n } from '@i18n';

import { PostgresErrorCode, UQ_USER_EMAIL } from './constraints';

export class DbUtil {
  private static readonly REG_FIND = /\(.*\)=/;
  private static readonly REG_REPLACE = /[()="']/g;

  static handlerError(err: DatabaseError) {
    switch (err.code) {
      case PostgresErrorCode.UniqueViolation:
        return DbUtil.transformUniqueViolation(err);
      case PostgresErrorCode.ForeignKeyViolation:
        return DbUtil.transformForeignKeyViolation(err);
      default:
        return new InternalServerErrorException();
    }
  }

  private static getKeyFromErrorDetail(err: DatabaseError) {
    if (err?.detail) {
      const keys = DbUtil.REG_FIND.exec(err.detail);

      if (keys !== null && keys[0]) {
        return keys[0].replace(DbUtil.REG_REPLACE, '');
      }
    }

    return '';
  }

  private static transformForeignKeyViolation(err: DatabaseError) {
    const key = DbUtil.getKeyFromErrorDetail(err);

    if (key) {
      return new UnprocessableEntityException([
        {
          key,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value: i18n()[`notFound.${key}`] || i18n()['notFound.default'],
        },
      ]);
    }

    return new InternalServerErrorException();
  }

  private static transformUniqueViolation(err: DatabaseError) {
    switch (err.constraint) {
      case UQ_USER_EMAIL.name:
        return new UnprocessableEntityException([
          { key: 'email', value: i18n()['validate.email.exists'] },
        ]);
      default:
        return new ConflictException(i18n()['validate.object.exists']);
    }
  }
}
