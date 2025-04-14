import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './users/dto/create-user.dto'; 
import { UsersService } from './users/users.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit() {
    const user = await this.userService.createExampleUser();
    console.log('Created user:', user);
  }

  getHello(): string {
    const message = 'Hello World! backend-api\n' + this.userService.findAll();
    return message;
  }
}
