import { Module } from '@nestjs/common';
import { ClassGroup } from './class-group.entity';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroupsController } from './class-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClassGroup])],
  controllers: [ClassGroupsController],
  providers: [ClassGroupsService],
  exports: [ClassGroupsService],
})
export class ClassGroupsModule {}
