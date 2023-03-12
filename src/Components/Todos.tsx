import { useState } from "react";
import { text } from "stream/consumers";
import todo from "../models/todo";
import TodoItems from "./TodoItems";
import classes from "./Todos.module.css";
import { useContext } from "react";
import { TodosContext } from "../store/todos-context";
const Todos:React.FC<{items: todo[], removeHandler:(id: string)=> void, completeHandler:(isComplete: string)=>void, editHandler:(id:string)=> void}>=(props)=>{

    

    return (
        <ul className={classes.todos}>
            {props.items.map((item)=> 
                <TodoItems
                    key={item.id}
                    onEdit= {props.editHandler.bind(null, item.id)}
                    text = {item.text}
                    onCompleted={props.completeHandler.bind(null, item.id)}
                    isCompleted= {item.isCompleted}
                    onRemove={props.removeHandler.bind(null, item.id)}
                />
            )}
        </ul>
    )
}

export default Todos;