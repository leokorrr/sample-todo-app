import { Injectable } from '@nestjs/common'
import { Prisma, Task } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: [{ id: 'desc' }],
    })
  }

  async getTask(params: { where: Prisma.TaskWhereUniqueInput }): Promise<Task> {
    const { where } = params

    return this.prisma.task.findUnique({
      where,
    })
  }

  async createTask(params: { data: Prisma.TaskCreateInput }): Promise<Task> {
    const { data } = params

    return this.prisma.task.create({ data })
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput
    data: Prisma.TaskUpdateInput
  }) {
    const { where, data } = params

    return this.prisma.task.update({
      where,
      data,
    })
  }

  async deleteTask(params: { where: Prisma.TaskWhereUniqueInput }) {
    const { where } = params

    return await this.prisma.task.delete({ where })
  }

  async isTaskExists(id: number): Promise<boolean> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    })

    if (task) return true

    return false
  }
}
