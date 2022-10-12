/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DatabaseError } from 'pg';
import {
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  QueryFailedError,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import DB from '@db/index';
import { i18n } from '@lib';
import {
  DB_UQ_USER_EMAIL,
  HttpException,
  LoggerType,
  PostgresErrorCode,
} from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { Logger } from './logger';

export default class RepositoryCore<Entity extends Id & ObjectLiteral> {
  protected readonly alias: string;
  protected orm: Repository<Entity>;
  private readonly notFound: string;

  constructor(entity: EntityTarget<Entity>, alias?: string) {
    this.orm = DB.dataSource.getRepository(entity);
    this.alias = alias || 'entity';
    this.notFound = (i18n()[`notFound.${this.alias}`] ||
      i18n()['notFound.default']) as string;
  }

  async create<T extends ObjectLiteral>(body: Entity): Promise<T> {
    try {
      const entity = this.orm.create(body);

      await this.orm.save(entity);

      return entity as unknown as T;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async delete(query: Partial<Entity>): Promise<void> {
    try {
      await this.orm.delete(query);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOne<T extends FindOneOptions<Entity>>(
    options: T,
  ): Promise<Entity | null> {
    try {
      return await this.orm.findOne(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOneOrFail<T extends FindManyOptions<Entity>>(
    options: T,
  ): Promise<Entity> {
    try {
      return await this.orm.findOneOrFail(options);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async update(entity: Entity, body: DeepPartial<Entity>): Promise<void> {
    try {
      this.orm.merge(entity, body);
      await this.orm.save(entity);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  protected buildOrder(
    { order }: Pick<FindManyOptions<Entity>, 'order'>,
    queryBuilder: SelectQueryBuilder<Entity>,
  ) {
    if (order && Object.keys(order).length) {
      for (const key in order) {
        if ({}.hasOwnProperty.call(order, key)) {
          queryBuilder.addOrderBy(
            `${this.alias}.${key}`,
            order[key] as Order,
            'NULLS LAST',
          );
        }
      }
    } else {
      queryBuilder.addOrderBy(`${this.alias}.id`, 'DESC');
    }
  }

  protected handleError(error: unknown) {
    Logger.error({
      message: this.constructor.name,
      error,
      type: LoggerType.DB,
    });

    if (
      (error as Error)?.name === 'EntityNotFound' ||
      (error as Error)?.name === 'EntityNotFoundError'
    ) {
      return ResponseHelper.error(HttpException.NOT_FOUND, {
        message: this.notFound,
      });
    }

    if (error instanceof QueryFailedError) {
      const err = error.driverError as DatabaseError;

      if (err.code === PostgresErrorCode.UniqueViolation) {
        switch (err.constraint) {
          case DB_UQ_USER_EMAIL:
            return ResponseHelper.error(HttpException.EMAIL_ALREADY_TAKEN);
          default:
            return error;
        }
      }
    }

    return error;
  }
}
