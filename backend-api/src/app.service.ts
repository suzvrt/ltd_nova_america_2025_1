import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return `Hello World! <a href="/api">Clique aqui para acessar o Swagger do backend-api</a>`;
  }
}
