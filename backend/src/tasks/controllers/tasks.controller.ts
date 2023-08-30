import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { Task } from '@prisma/client'
import { TaskDto } from '../dto/TaskDto'
import { TasksService } from '../services/tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('')
  async getTasks(): Promise<Task[]> {
    try {
      return await this.tasksService.getTasks()
    } catch (error) {
      throw new HttpException(
        'Something went wrong during fetching tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Post('')
  async createTask(@Body() createTaskDto: TaskDto): Promise<Task> {
    try {
      return await this.tasksService.createTask({
        data: createTaskDto,
      })
    } catch (error) {
      throw new HttpException(
        'Something went wrong during task creation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: TaskDto,
  ): Promise<Task> {
    let isTaskExists

    try {
      isTaskExists = await this.tasksService.isTaskExists(Number(id))
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    if (!isTaskExists) {
      throw new HttpException('Task do not exists', HttpStatus.NOT_FOUND)
    }

    try {
      return await this.tasksService.updateTask({
        where: { id: Number(id) },
        data: updateTaskDto,
      })
    } catch (error) {
      throw new HttpException(
        'Something went wrong during task update',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: number) {
    let isTaskExists

    try {
      isTaskExists = await this.tasksService.isTaskExists(Number(id))
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    if (!isTaskExists) {
      throw new HttpException('Task do not exists', HttpStatus.NOT_FOUND)
    }

    try {
      await this.tasksService.deleteTask({ where: { id: Number(id) } })
      return true
    } catch (error) {
      throw new HttpException(
        'Something went wrong during task remove',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
