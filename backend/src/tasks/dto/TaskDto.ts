import { IsNotEmpty } from 'class-validator'

export class TaskDto {
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  done: boolean
}
