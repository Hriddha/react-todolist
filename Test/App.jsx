import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'


function App() {

  // const inputRef = useRef();
  
  const savedItems = JSON.parse(localStorage.getItem("todo")); 


  const [todo, setTodo] = useState(); 
  const [todos, setTodos] = useState(savedItems);
  
  // const [todoArr, setTodoArr] = useState([]);



  useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos])




  const addHandler = () =>{
    console.log(todo);
    setTodos(todo);
    
    // console.log(todoArr);
  }

  const inputHandler = (e)=>{
    // setTodoArr({...todoArr,[e.target.name]:e.target.value });
    setTodo(e.target.value);
  }





  return (
    <>
      <Navbar />
      <div className='border-2 border-red-400 flex justify-center flex-col items-center '>
        <div id='todoBody' className='border-2 border-blue-500'>
          <div className='title font-bold text-center m-8 text-2xl'>myToDo-Your One and Only ToDo Manager</div>
          <div className='todoAdd flex'>

            <input  type="text" name="todo" onChange={inputHandler} className='w-full h-10 border-2 border-black' />
            <button className='border-2 border-black ml-1 rounded-md' onClick={addHandler}>Add</button>

          </div>
          <br />
          <span className='font-bold text-center m-2 text-2xl'>Your Todos</span>

        </div>
      </div>
    </>
  )
}

export default App
