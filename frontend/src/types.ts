export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface ITodo {
  id?: number
  content: string
  done: boolean
}