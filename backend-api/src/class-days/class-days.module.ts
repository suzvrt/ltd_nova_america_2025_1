import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassDay } from './class-day.entity';
import { ClassDaysService } from './class-days.service';
import { ClassDaysController } from './class-days.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassDay])],
  controllers: [ClassDaysController],
  providers: [ClassDaysService],
  exports: [ClassDaysService],
})
export class ClassDaysModule {}
