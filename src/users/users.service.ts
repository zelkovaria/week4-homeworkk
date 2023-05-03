import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const { userId, userPassword, userName } = createUserDto;

    if (this.users.find((user) => user.userId === userId)) {
      throw new ConflictException('User already exist');
    }

    const user = {
      userId,
      userPassword,
      userName,
    };

    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findOne(userId: string) {
    const user = this.users.find((user) => user.userId === userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const user = this.users.find((user) => user.userId === id);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const { userId, userPassword, userName } = updateUserDto;

  //   user.userId = userId;
  //   user.userPassword = userPassword;
  //   user.userName = userName;

  //   return user;
  // }
  update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, userName } = updateUserDto;
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }
    this.users = this.users.filter((user) => user.userId !== id); // 기존 정보 제거
    console.log(this.users);
    user.userId = userId;
    user.userName = userName;
    this.users.push(user);
    console.log('게시글 수정 완료');
  }

  remove(id: string) {
    const user = this.users.find((user) => user.userId === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.users = this.users.filter((user) => user.userId !== id);

    return user;
  }
}
