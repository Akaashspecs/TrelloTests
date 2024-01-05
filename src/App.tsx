import axios from 'axios';
import {  useEffect, useRef, useState } from 'react'

interface apiData {
  completed: boolean,
  id: number,
  title: string
  userId: number
}


function App() {
  const [count, setCount] = useState(0);
  const [todoExample, setTodoExample] = useState<apiData[]>([]);
  const [filterTodo, setFilterTodo] = useState<apiData[]>([]);
  const [todo, setTodo] = useState<apiData[]>([]);
  const [message, setMessage] = useState<apiData[]>([]);

  const onDrag = useRef<any>()
  const onDragEnter = useRef<any>()

  useEffect(() => {
const exampleTodo = axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => setTodoExample(response.data));

  },[])

  useEffect(() => {
    setFilterTodo(todoExample.filter((item) => item.id <= 10))

  },[])



  const handleInputChange = (event:any) => {
    setMessage(event.target.value);
  };

  const handleInputClick = ()=> {
setTodo(message);
  };


const draggableTo = (e, position: number) => {
  console.log(e)
  onDragEnter.current = position
}

const dragEnterTo = (e, position: number) => {
  onDrag.current = position
  }
  const drop = (e) => {
    console.log("2",e)
    const copyListItems = [...filterTodo];
    const dragItemContent = copyListItems[onDrag.current];
    copyListItems.splice(onDrag.current, 1);
    copyListItems.splice(onDragEnter.current, 0, dragItemContent); 
    onDrag.current = null;
    onDragEnter.current = null;
    setFilterTodo(copyListItems);
  }

  const dropTodo = (e) => {
    console.log("2",e)
    const copyListItems = [...todo];
    const dragItemContent = copyListItems[onDrag.current];
    copyListItems.splice(onDrag.current, 1);
    copyListItems.splice(onDragEnter.current, 0, dragItemContent); 
    onDrag.current = null;
    onDragEnter.current = null;
    setTodo(copyListItems);
  }





  return (
 
      <div className='p-5 flex '>

<div >Example Todo <div className='bg-blue-100 min-h-52 w-80  py-4 flex justify-center content-center '>
          <div className='bg-blue-300 min-h-28 w-72 p-4'>
           {filterTodo && filterTodo.map((data, index) => { return (<div key={data.id} onDragEnd={(e) => drop(e)} onDragStart={(e) => draggableTo(e, index)} onDragEnter={(e) => dragEnterTo(e, index)} draggable className='bg-blue-100 text-black my-5'>{data?.title}</div>)})}
          </div>
         
          </div>
          
        </div>
        
        <div className='ml-5'>Todo <div className='bg-blue-100 min-h-52 w-80  py-4 flex justify-center content-center'>
        <div className='bg-blue-300 min-h-28 w-72 p-4'>
           {todo && todo.map((data, index) => { return (<div onDragOver={(e) => dropTodo(e)} onDragStart={(e) => draggableTo(e, index)} onDragEnter={(e) => dragEnterTo(e, index)} draggable className='bg-blue-100 text-black my-5'>{data?.title}</div>)})}
           <input onChange={(e) => {handleInputChange(e)}} className='w-full'></input> <button type='button' onClick={handleInputClick}>dfdf</button>
          </div>
        
         
          </div>
          
        </div>
        

        <div className='ml-5'>In Progress <div className='bg-blue-100 min-h-52   w-80 py-4 flex justify-center content-center'>
          <div className='bg-blue-300 min-h-28 w-72 '>

          </div>
         
          </div>
          
        </div>

        <div className='ml-5'>Completed <div className='bg-blue-100 min-h-52  w-80 py-4 flex justify-center content-center'>
          <div className='bg-blue-300 min-h-28 w-72 '>

          </div>
         
          </div>
          
        </div>
   
      </div>
      
    
  )
}

export default App
