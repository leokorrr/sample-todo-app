import { Button } from '../Button/'
import { useInput } from './useInput'

export const Input = () => {
  const {
    inputValue,
    handleInputChange,
    handleTodoAdd,
    isLoading,
    isButtonDisabledCondition,
    isError
  } = useInput()

  return (
    <div className='w-full mb-[20px] px-[8px]'>
      <div>
        <form
          className='flex gap-[8px] w-full'
          onSubmit={handleTodoAdd}
        >
          <input
            value={inputValue}
            className='border w-full p-[8px] rounded-md'
            placeholder='Type task...'
            onChange={handleInputChange}
          />{' '}
          <Button
            title='Add'
            type='submit'
            isLoading={isLoading}
            isDisabled={isButtonDisabledCondition}
          />
        </form>
      </div>
      {isError ? (
        <div className='text-[14px] mt-[8px] text-red-500'>Something went wrong...</div>
      ) : null}
    </div>
  )
}
