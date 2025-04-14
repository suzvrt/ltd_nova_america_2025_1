import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UnitsModule } from './units/units.module';
import { ClassesModule } from './classes/classes.module';
import { AttendancesModule } from './attendances/attendances.module';

@Module({
  imports: [UsersModule, UnitsModule, ClassesModule, AttendancesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
