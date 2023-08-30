import { Input } from './components/Input'
import { TodoList } from './components/TodoList'

function App() {
  return (
    <div className='w-full flex justify-center'>
      <div className='p-[20px] w-full max-w-[720px]'>
        <h1 className='text-[28px] font-bold mb-[20px]'>Todos: </h1>
        <Input />
        <TodoList />
      </div>
    </div>
  )
}

export default App
