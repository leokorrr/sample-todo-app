import { swrFetcher } from '../../utils/swrFetcher'
import useSWR from 'swr'
import { Todo } from '../Todo'
import { ITodo } from '../../types'
import { SWR_TASKS_KEY } from '../../utils/constants'

export const TodoList = () => {
  const {
    data: todos,
    isLoading,
    error
  } = useSWR(SWR_TASKS_KEY, swrFetcher)

  if (isLoading) return <div className='text-[14px]'>Loading...</div>

  if (error) return <div className='text-[14px] text-red-500'>Error</div>

  return (
    <div className='flex flex-col gap-[8px]'>
      {todos.map((todo: ITodo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          content={todo.content}
          done={todo.done}
        />
      ))}
    </div>
  )
}
