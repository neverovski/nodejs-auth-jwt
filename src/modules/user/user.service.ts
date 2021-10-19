import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';
import { responseError, HttpExceptionType } from '@utils/index';

import { IUserService } from './interface';
import UserRepository from './user.repository';
import { User, FullUser } from './user.type';

export default class UserService extends ServiceCore implements IUserService {
  private readonly repository: UserRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(UserRepository);
  }

  async create(body: User) {
    try {
      await this.repository.createUser(body);
    } catch {
      throw responseError(HttpExceptionType.USER_ALREADY_TAKEN);
    }
  }

  async getOne(query: Partial<FullUser>) {
    const userFromDB = await this.repository.findOneUserOrFail(query);

    return userFromDB as FullUser;
  }

  async validateCredentials(
    user: Pick<User, 'password'>,
    password: string,
  ): Promise<boolean> {
    return user.password ? compare(password, user.password) : false;
  }
}