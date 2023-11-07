import { inject } from 'tsyringe';

import { ServiceCore } from '@core/service';

import {
  IUserRepository,
  IUserService,
  IUserValidatorService,
} from '../interface';
import { USER_RELATION } from '../user.constant';
import { UserInject } from '../user.enum';
import {
  CreateUser,
  PasswordChangeRequest,
  UpdateUser,
  UserCtx,
  UserOption,
  UserQuery,
} from '../user.type';

export class UserService extends ServiceCore implements IUserService {
  constructor(
    @inject(UserInject.REPOSITORY)
    private readonly repository: IUserRepository,
    @inject(UserInject.VALIDATOR_SERVICE)
    private readonly validatorService: IUserValidatorService,
  ) {
    super();
  }

  count(query: UserQuery, ctx?: UserCtx) {
    const options = this.getOptions(query, ctx);

    return this.repository.countByQuery(options);
  }

  create(data: CreateUser) {
    return this.repository.create(data);
  }

  async delete(query: UserQuery) {
    const { id } = await this.repository.findOneOrFail({
      where: query,
      select: { id: true },
    });

    await this.repository.delete({ id });
  }

  getList(query: UserQuery, ctx?: UserCtx) {
    const options = this.getOptions(query, ctx);

    return this.repository.findByQuery(options);
  }

  getOne(query: UserQuery, ctx?: UserCtx) {
    const options = this.getOptions(query, ctx);

    return this.repository.findOne(options);
  }

  getOneWithException(query: UserQuery, ctx?: UserCtx) {
    const options = this.getOptions(query, ctx);

    return this.repository.findOneOrFail(options);
  }

  async update(query: UserQuery, data: UpdateUser) {
    const { id } = await this.repository.findOneOrFail({
      where: query,
      select: { id: true },
    });

    await this.repository.update({ id }, data);

    return this.getOneWithException({ id });
  }

  async updatePassword(query: UserQuery, data: PasswordChangeRequest) {
    const { oldPassword, newPassword } = data;

    this.validatorService.checkNewPassword(data);

    const { id, password } = await this.repository.findOneOrFail({
      where: query,
      select: { id: true, password: true },
    });

    await this.validatorService.checkOldPassword({ password }, oldPassword);
    await this.repository.update({ id }, { password: newPassword });
  }

  private getOptions(query: UserQuery, ctx?: UserCtx): UserOption {
    return {
      ...ctx,
      relations: USER_RELATION,
      where: query,
    };
  }
}