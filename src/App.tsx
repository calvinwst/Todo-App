import React, { useEffect, useState } from 'react';
import './App.css';
import Todos from './Components/Todos';
import todo from './models/todo';
import NewTodo from './Components/NewTodo';
import EditForm from './Components/EditTodoForm';

function App() {

  const [editingTodoId, setEditingTodoID] = useState<string | null>();
  const [todos, setTodos]=useState<todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteTodo, setDeleleteTodo] = useState<todo[]>([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]'); //to get the item with the value of the data with keyname
    setTodos(storedTodos); //store the value of it in the setTodos state
  }, []);

  //Add todo item button 
  const addHandler = (newText: string)=>{
    const newTodo:todo[] = [
    {
      text: newText,  // add the newText dynamically 
      id: (new Date().getTime()).toFixed(2),
      isCompleted: false,
    }
   ]
   setTodos((prevData)=>{
     const updateTodos =  prevData.concat(newTodo);//add the newly add todo item to the original todo item which is store in usestate 
     localStorage.setItem("todos", JSON.stringify(updateTodos)) // store the object of updateTodos to localStorage as a json string
     return updateTodos;
   })  
  }
  //Remove unwanted todo item form the app
  const onRemoveHandler =(todoId: string)=>{
      //deleted todo item 
      const deleteTodo = todos.find((todo)=> todo.id === todoId)
      if(deleteTodo){
        const updatedTodos = todos.filter((todo)=> todo.id !== todoId);
        //update the setTodos item array
        setTodos(updatedTodos);
        //update the delete item array (where the array hold the item that are delete and store them in an aray)
        setDeleleteTodo(prevDeleteTodo => [...prevDeleteTodo, deleteTodo])
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        //store the updateTodos as a json string object
      }
  }
  //Complete button that allow user to clikck on the todo task that w=thwy have completed
  const onCompleteHandler= (todoComplete: string)=>{
    setTodos((prevData)=>{
      const completedTodo =  prevData.map((todo)=>
        todo.id ===todoComplete ? {...todo, isCompleted : !todo.isCompleted} : todo) // check if the todoid if it have the same vlaue as todocompl if 
      localStorage.setItem('todos', JSON.stringify(completedTodo));
      return completedTodo
    })
  }
  //button just to open edit form to allow use to input their value to change 
    const onEditHandler =(todoID: string)=>{
      setEditingTodoID(todoID)
        setIsEditing(true)
        console.log("button press")
    }
  //Close the editform 
  const onCloseHandler =()=>{
    console.log('button pressed')
    setIsEditing(false);
    setEditingTodoID(null);
  }
  //Edit button where it take 2 arguement the id and the updateText 
  const onUpdateHandler = ( upadateText: string, todoId: string)=>{
    setTodos((prevData)=>{
      const editTodos = prevData.map((todo)=>
        todo.id === todoId ? {...todo, text : upadateText } : todo // if the todoID arrugement that took in is the same as
      )                                                    //todo.id the change the original todo array text to the 
                                                            // arrugment of updatetext or not return todo array.
      localStorage.setItem('todos',JSON.stringify(editTodos))
      return editTodos;
    }) 
    setIsEditing(false);
    setEditingTodoID(null)   
  }
  const onUndoHandler =()=>{
    console.log('button presssed 2')
    const lastDeleteTodo = deleteTodo.pop();//find the last itme array that is delete form the todos array    
    console.log(todos)//show the update array todo item after the deleted todo item
    if(lastDeleteTodo){
      const updateTodos =[...todos, lastDeleteTodo];// add the last todo item to the update todos array
      setTodos(updateTodos);
      console.log(updateTodos);//show the update todo that add the last tiem of todos to the todos array
      setDeleleteTodo([...deleteTodo])
      //console.log(deleteTodo);
      localStorage.setItem('todos', JSON.stringify(updateTodos));
    }
  }

  return (
    <>
      <NewTodo 
        addTodo={addHandler}
        undoTodo = {onUndoHandler}
      />
      {isEditing && editingTodoId && (<EditForm
        todoId={editingTodoId}
        updateHandler ={onUpdateHandler}
        closeHandler = {onCloseHandler}
      />)}  
        <Todos
        editHandler ={onEditHandler}
        removeHandler={onRemoveHandler}
        completeHandler={onCompleteHandler}
        items= {todos}
      />      
    </>
  );
}

export default App;
