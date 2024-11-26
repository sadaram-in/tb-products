import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDummyDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}