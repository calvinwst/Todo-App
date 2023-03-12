import React, {  useRef, useState } from "react"
import classes from './NewTodo.module.css';
import todo from "../models/todo";
import { useContext } from "react";
import { TodosContext } from "../store/todos-context";
const NewTodo:React.FC<{addTodo: (textvalue: string)=> void, undoTodo:()=> void}> =  (props) =>{


    const todoTextInput = useRef<HTMLInputElement>(null);

    //submit the form of the newly todo 
    const submitHandler = (event: React.FormEvent)=>{ 
        event.preventDefault();
        
        const enterText = todoTextInput.current!.value;
        
        if(enterText.trim().length === 0){  
            return;
        }
        props.addTodo(enterText);

        if(enterText.trim().length > 0){ // if input value is > 0 input will turn empty 
            return todoTextInput.current!.value= '';
        }
    }

    //connect the function of undohandler to onUndoHandler in app.tsx
    const undoHandler = (event: React.MouseEvent)=>{
        event.preventDefault();
        props.undoTodo();
    }


    return (
        <>
            <form onSubmit={submitHandler} className={classes.form} >
                <label>New Todo</label>
                <input type="text" ref={todoTextInput}  />
                <button>Add Todo</button>
                <button onClick={undoHandler} type="button" className={classes.button}>Undo</button>
            </form>
        </>
    )
}
export default NewTodo