import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { AiTwotoneDelete } from "react-icons/ai";
import { ImRedo2 } from "react-icons/im";
import { MdLibraryAdd } from "react-icons/md";


function App() {

  // const inputRef = useRef();
  
  const savedItems = JSON.parse(localStorage.getItem("todoArr")); 
  const completedSavedItems = JSON.parse(localStorage.getItem("cTasks")); 

  const inputRef  = useRef();
  const updateRef = useRef();
  const [updateId, setUpdateId] = useState();
  const [updateState, setUpdateState] = useState(false);
  const [todo, setTodo] = useState(" ");
  const [strikeThrough, setStrikeThrough] = useState(false); 
  const [todoArr, setTodoArr] = useState(savedItems || []);
  const [ cTasks, setCTasks] = useState(completedSavedItems || []);
  const [ cState, setCState] = useState(false);

  
  



  useEffect(()=>{
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }, [todoArr])

  useEffect(()=>{
    localStorage.setItem("cTasks", JSON.stringify(cTasks));
  },[cTasks])




  const addHandler = () =>{
    if(inputRef.current.value==""){
      alert("Todo List cannot be empty");
    }
    else{
      console.log(todo);
      setTodoArr([...todoArr, {id:uuidv4(),content:todo, isDone:false} ]);
      setTodo("");
      // 
      if(updateState==true){
        const newArr = todoArr.map((item)=>{
          if(updateId==item.id){
            setUpdateState(false);
            // updateRef.current.style.display="block"
            return {...item, content:inputRef.current.value }
          }
          return item
        })
        setTodoArr(newArr)
      }
      
    }


    
  }

  const inputHandler = (e)=>{
    // setTodoArr({...todoArr,[e.target.name]:e.target.value });
    setTodo(e.target.value);
  }


  const checkBoxHandler = (e)=>{
    const id = e.target.name;

    const updatedArrOpt =  todoArr.map((item)=>{
      if(id == item.id){
        return {...item, isDone:!item.isDone}  
      }
      return item
    })
    setTodoArr(updatedArrOpt);
    setCTasks(updatedArrOpt);
    
    if(cState==true){

      const unchecked = cTasks.filter((item)=>!item.isDone);
      if(unchecked){
        console.log(unchecked)
        setCState(false);
      }
    }

    


    
    // console.log(id);
  }


  const cHandler = ()=>{
    const completedTask = cTasks.filter((item)=>{
      if(item.isDone){
        return item;
      }
    })
    setCTasks(completedTask);
    setCState(true);
  }

  const homeHandler = () =>{
    const allTasks = todoArr.map((item)=>{
      return item
    })
    setTodoArr(allTasks);
    setCState(false);
  }

  const updateHandler = (e) =>{
    const id = e.currentTarget.name;
    console.log(id);
    const update = todoArr.map((item)=>{
      if(id == item.id){
        inputRef.current.value = item.content;
        setUpdateId(id);
        setUpdateState(true)

        item.content = "";
        return {...item, content:item.content}
      }
      return item
    })
    setTodo(update);
  }

  const deleteHandler = (e)=>{
    const id = e.currentTarget.name;
    console.log("delete")
    
    const deletedArr = todoArr.filter((item)=>{
      
      if(id != item.id){
        return item;
      }
    })

    setTodoArr(deletedArr);
    
  }

  return (
    <>
      <Navbar h1 = {cHandler} h2 = {homeHandler} />
      <div id="body-cont" className=' flex sm:justify-center sm:flex-col sm:items-center h-screen  '>
        <div id='todoBody' className='border-2 border-sky-400 shadow-lg shadow-blue-300 rounded-xl sm:m-0 m-5 sm:h-auto 3xl:h-120'>
          <div className='title font-bold text-center m-8 sm:text-2xl  text-lg'>myToDo-Your One and Only ToDo Manager</div>
          <div className='todoAdd flex m-2 sm:flex-row flex-col items-center '>

            <input  ref={inputRef} type="text" name="todo" onChange={inputHandler} className='w-full h-10 border-2 border-black rounded-md ' />
            <button className=' sm:ml-1 m-4 rounded-md ' onClick={addHandler}><MdLibraryAdd className='w-10 h-6'/></button>

          </div>
          <br />
          <span className='font-bold text-center m-2 text-2xl'>Your Todos</span>
          <br/>
          <hr className='m-6 border-1 border-black border-dashed'/>
          {cState?cTasks.map((item, index)=>(
            
            <div key={index} className='m-3 flex items-center justify-around border-2 border-sky-300 rounded-lg transition-all hover:shadow-2xl hover:shadow-cyan-400 hover:scale-95 cursor-pointer'>
              <input name={item.id} onChange={checkBoxHandler} type="checkbox" checked={item.isDone}/>
              <span className={item.isDone?"line-through":" "} >{item.content}</span>

            </div>
          )):todoArr.map((item, index)=>(
            
            <div key={index} className='m-3 flex items-center justify-around border-2 border-sky-300 rounded-lg transition-all hover:shadow-2xl hover:shadow-cyan-400 hover:scale-95 cursor-pointer'>
              <input name={item.id} onChange={checkBoxHandler} type="checkbox" checked={item.isDone}/>
              <span className={item.isDone?"line-through":" "} >{item.content}</span>
              <div className='btnBox flex justify-end  border-2 '>

                {item.id==updateId&&updateState?null:(<button ref={updateRef}  className= "m-1 bg-sky-400 rounded-lg " name={item.id} onClick={updateHandler}><ImRedo2 className='w-10 h-6'/>
                  </button>)}
                <button  className= "m-1 bg-sky-400 rounded-lg " name={item.id} onClick={deleteHandler}><AiTwotoneDelete  className='w-10 h-6'/></button>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
