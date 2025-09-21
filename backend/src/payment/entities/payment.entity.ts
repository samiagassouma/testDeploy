import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment')
export class Payment {

    @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ nullable: true })
      amount: number;
    
      @Column({ length: 100 , nullable: true})
      plan: string;
    
          @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  user: User;
}
