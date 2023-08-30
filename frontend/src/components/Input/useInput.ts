import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { SWR_TASKS_KEY } from '../../utils/constants'
import { swrFetcher } from '../../utils/swrFetcher'

export const useInput = () => {
  const [inputValue, setInputValue] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [isError, setIsError] = useState(false)

  const isButtonDisabledCondition = !inputValue

  const { mutate } = useSWRConfig()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleInputClear = () => setInputValue('')

  const handleTodoAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    setIsError(false)

    const res = await swrFetcher(SWR_TASKS_KEY, {
      method: 'POST',
      body: JSON.stringify({
        content: inputValue,
        done: false
      })
    })

    if (res) {
      mutate(SWR_TASKS_KEY)

      handleInputClear()
    } else {
      setIsError(true)
    }

    setIsLoading(false)
  }

  return {
    inputValue,
    handleInputChange,
    handleTodoAdd,
    isLoading,
    isButtonDisabledCondition,
    isError
  }
}
