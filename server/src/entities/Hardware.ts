import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm"
import Model from "../models/Model";

@Entity()
export default class Hardware extends Model {
    @Column("text")
    @Index()
    name: string

    @Column("text")
    @Index()
    location: string

    @Column({type: "decimal", precision: 15, scale: 12})
    hashRate: number
}
