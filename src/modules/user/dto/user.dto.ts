import { Exclude, Expose, Type } from 'class-transformer';

import { ProfileDto } from './profile.dto';

@Exclude()
export class UserDto {
  @Expose()
  createdAt!: Date;

  @Expose()
  email!: string;

  @Expose()
  id!: number;

  @Expose()
  isConfirmedEmail!: boolean;

  @Expose()
  @Type(() => ProfileDto)
  profile!: ProfileDto;
}
