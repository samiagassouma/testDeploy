import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { SupabaseService } from 'src/supabase/supabase.service';



@Injectable()
export class PaymentService {

  constructor( private readonly supabaseService: SupabaseService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    console.log("createPaymentDto", createPaymentDto);
    const { data, error } = await this.supabaseService.getClient()
  .from('payment')
  .insert(createPaymentDto);  
  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message); 
  }
    
  }

  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
  .from('payment')
  .select()
  return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
