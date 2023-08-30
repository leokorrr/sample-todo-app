import { ITodo } from '../../types'
import { SWR_TASKS_KEY } from '../../utils/constants'
import { swrFetcher } from '../../utils/swrFetcher'
import { useSWRConfig } from 'swr'
import { Button } from '../Button'
import { useState } from 'react'

export const Todo: React.FC<ITodo> = (props) => {
  const { content, done, id } = props

  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useSWRConfig()

  const handleTodoStatusChange = async () => {
    setIsLoading(true)

    const res = await swrFetcher(`${SWR_TASKS_KEY}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content,
        done: !done
      })
    })

    if (res) {
      mutate(SWR_TASKS_KEY)
    }

    setIsLoading(false)
  }

  const handleTodoDelete = async () => {
    setIsLoading(true)

    const res = await swrFetcher(`${SWR_TASKS_KEY}/${id}`, {
      method: 'DELETE'
    })

    if (res) {
      mutate(SWR_TASKS_KEY)
    }

    setIsLoading(false)
  }

  return (
    <div
      className='flex gap-[8px] py-[12px] items-center justify-between hover:cursor-pointer hover:bg-black/[.04] transition px-[8px]'
      onClick={handleTodoStatusChange}
    >
      <div className='flex gap-[8px] items-center'>
        <div>
          <input
            type='checkbox'
            checked={done}
            onChange={() => {}}
          />
        </div>
        <div className={`${done ? 'text-black/[.6] line-through' : ''}`}>{content}</div>
      </div>
      <Button
        title='Delete'
        onClick={handleTodoDelete}
        variation='danger'
        isLoading={isLoading}
      />
    </div>
  )
}
