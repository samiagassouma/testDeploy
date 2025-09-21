import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from 'src/supabase/supabase.service';



@Injectable()
export class UsersService {
constructor(private readonly supabaseService: SupabaseService) {
  console.log("SupabaseService injected into UsersService");
  console.log("Supabase Client:", this.supabaseService.getClient());
}



  async create(createUserDto: CreateUserDto) {
    const { data, error } = await this.supabaseService.getClient()
  .from('users')
  .insert(createUserDto);
    if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message);
  }
  }

  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
  .from('users')
  .select()
  return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseService.getClient()
  .from('users')
  .select('*')
  .eq('id', id)    // Correct
  .single()
  return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { data, error } = await this.supabaseService.getClient()
  .from('users')
  .update(updateUserDto)
  .eq('id', id)
  }

  async remove(id: number) {
    const response = await this.supabaseService.getClient()
  .from('users')
  .delete()
  .eq('id', id)
  }
}
