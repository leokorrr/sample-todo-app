import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { PrismaService } from 'src/prisma.service'

const tasksArray = [
  { content: 'task 1', done: false },
  { content: 'task 2', done: true },
]

const oneTask = tasksArray[0]

const db = {
  task: {
    findMany: jest.fn().mockResolvedValue(tasksArray),
    findUnique: jest.fn().mockResolvedValue(oneTask),
    create: jest.fn().mockReturnValue(oneTask),
    update: jest.fn().mockResolvedValue(oneTask),
    delete: jest.fn().mockResolvedValue(oneTask),
  },
}

describe('TasksService', () => {
  let service: TasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<TasksService>(TasksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = await service.getTasks()
      expect(tasks).toEqual(tasksArray)
    })
  })

  describe('createTask', () => {
    it('should successfully create a task', async () => {
      expect(
        service.createTask({ data: { content: 'task 1', done: false } }),
      ).resolves.toEqual(oneTask)
    })
  })

  describe('updateTask', () => {
    it('should successfully update a task', async () => {
      expect(
        service.updateTask({
          where: { id: 1 },
          data: { content: 'task 1', done: false },
        }),
      ).resolves.toEqual(oneTask)
    })
  })

  describe('deleteTask', () => {
    it('should successfully delete a task', async () => {
      expect(
        service.deleteTask({
          where: { id: 1 },
        }),
      ).resolves.toEqual(oneTask)
    })
  })
})
