import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';
dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!
console.log("variables====",supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey)


@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const { data, error } = await supabase
  .from('users')
  .insert(createUserDto);
    if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message);
  }
  }

  async findAll() {
    const { data, error } = await supabase
  .from('users')
  .select()
  return data;
  }

  async findOne(id: number) {
    const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', id)    // Correct
  .single()
  return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { data, error } = await supabase
  .from('users')
  .update(updateUserDto)
  .eq('id', id)
  }

  async remove(id: number) {
    const response = await supabase
  .from('users')
  .delete()
  .eq('id', id)
  }
}
