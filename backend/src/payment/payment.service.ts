import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!
console.log("variables====",supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey)


@Injectable()
export class PaymentService {
  async create(createPaymentDto: CreatePaymentDto) {
    console.log("createPaymentDto", createPaymentDto);
    const { data, error } = await supabase
  .from('payment')
  .insert(createPaymentDto);  
  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message); 
  }
    
  }

  async findAll() {
    const { data, error } = await supabase
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
