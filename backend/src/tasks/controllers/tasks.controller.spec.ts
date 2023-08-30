import { Test, TestingModule } from '@nestjs/testing'
import { TaskDto } from '../dto/TaskDto'
import { TasksService } from '../services/tasks.service'
import { TasksController } from './tasks.controller'
import { Prisma } from '@prisma/client'

const tasks = [
  {
    id: 1,
    content: 'todo',
    done: false,
  },
]

describe('TasksController', () => {
  let controller: TasksController

  const mockCardsService = {
    getTasks: jest.fn().mockResolvedValue(tasks),
    isTaskExists: jest.fn().mockImplementation((id: string) => {
      if (Number(id) <= tasks.length) return Promise.resolve(true)

      return Promise.resolve(false)
    }),
    createTask: jest
      .fn()
      .mockImplementation((params: { data: Prisma.TaskCreateInput }) => {
        const { data } = params

        return Promise.resolve({ id: 1, ...data })
      }),
    updateTask: jest
      .fn()
      .mockImplementation(
        (params: {
          where: Prisma.TaskWhereUniqueInput
          data: Prisma.TaskUpdateInput
        }) => {
          const { where, data } = params

          return Promise.resolve({ id: where.id, ...data })
        },
      ),
    deleteTask: jest.fn().mockResolvedValue(true),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockCardsService,
        },
      ],
    }).compile()

    controller = module.get<TasksController>(TasksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getTasks', () => {
    it('should get an array of tasks', async () => {
      await expect(controller.getTasks()).resolves.toEqual([
        {
          id: 1,
          content: 'todo',
          done: false,
        },
      ])
    })
  })

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask: TaskDto = {
        content: 'todo',
        done: false,
      }

      await expect(controller.createTask(newTask)).resolves.toEqual({
        id: 1,
        ...newTask,
      })
    })
  })

  describe('updateTask', () => {
    const updateData: TaskDto = {
      content: 'todo 2',
      done: true,
    }

    it('should create a new task', async () => {
      await expect(controller.updateTask('1', updateData)).resolves.toEqual({
        id: 1,
        ...updateData,
      })
    })

    it('should throw error if task do not exists', async () => {
      await expect(controller.updateTask('10', updateData)).rejects.toThrow()
    })
  })

  describe('deleteTask', () => {
    it('should return that it deleted a task', async () => {
      await expect(controller.deleteTask(1)).resolves.toEqual(true)
    })

    it('should throw error if task do not exists', async () => {
      await expect(controller.deleteTask(10)).rejects.toThrow()
    })
  })
})
