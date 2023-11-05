import type {EntityManager, ObjectType, Repository} from 'typeorm';
import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';

export type ModelConstructor = {
  [P in keyof typeof Model]: (typeof Model)[P];
};

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
