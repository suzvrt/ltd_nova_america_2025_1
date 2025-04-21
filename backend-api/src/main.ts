import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SisAlfa')
    .setDescription(
      'Sistema de controle de presenças do Programa de Alfabetização e Letramento de Jovens e Adultos do Instituto Yduqs na Estácio.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => {
    console.log(`API iniciou com sucesso.`);
  })
  .catch((error) => {
    console.error('Erro iniciando a API: ', error);
  });
