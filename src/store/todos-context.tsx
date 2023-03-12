import React, { createContext, useState } from "react";
import todo from "../models/todo";


type TodosContextObj= {
    items: todo[], 
    addTodo:(text:string)=>void, 
    removeHandler:(id:string)=>void,
    completeHandler:(id:string)=>void, 
    editHandler:(id:string)=>void,
    updateHandler:(id:string, text:string)=>void

}

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: (text:string)=>{},
    removeHandler: (id:string)=>{},
    completeHandler:(id:string) =>{},
    editHandler:(id:string) =>{},
    updateHandler:(id:string, text:string) =>{}
});


const TodosContextProvide:React.FC <{children: any}>= (props)=>{

const [editingTodoId, setEditingTodoID] = useState<string | null>();
  const [todos, setTodos]=useState<todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const addHandler = (newText: string)=>{
   
    const newTodo:todo[] = [
    {
      text: newText,
      id: Date(),
      isCompleted: false,
    }
   ]
   setTodos((prevData)=>{
     return prevData.concat(newTodo);
   })
   console.log(newTodo);
  }

  const onRemoveHandler =(todoId: string)=>{
    setTodos((prevData)=> {
      return prevData.filter((todo)=>
        todo.id !== todoId);
    })
  }

  const onCompleteHandler= (todoComplete: string)=>{
    setTodos((prevData)=>{
      return prevData.map((todo)=>
        todo.id ===todoComplete ? {...todo, isCompleted : !todo.isCompleted} : todo
      )
    })
   
  }

  const onEditHandler =(todoID: string)=>{
    setEditingTodoID(todoID)
    setIsEditing(true)
    console.log("button press")
  }

  const onUpdateHandler = ( upadateText: string, todoId: string)=>{

      setTodos((prevData)=>{
        return prevData.map((todo)=>
          todo.id === todoId ? {...todo, text : upadateText } : todo
           
        )
      })
      console.log(todoId);
      setIsEditing(false);
      setEditingTodoID(null)
  }

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addHandler,
    removeHandler: onRemoveHandler,
    completeHandler: onCompleteHandler,
    editHandler: onEditHandler,
    updateHandler: onUpdateHandler
  }

    return <TodosContext.Provider value={contextValue}>
        {props.children}
    </TodosContext.Provider>
           
}

export default TodosContextProvide;