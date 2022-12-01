import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsBoolean()
  public isDone: boolean;
}
