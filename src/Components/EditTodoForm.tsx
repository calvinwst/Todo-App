import React ,{ useRef} from "react";
import classes from './NewTodo.module.css';

const EditForm:React.FC<{updateHandler: (updateText: string, todoId: string)=> void, todoId: string, closeHandler:()=>void }> =(props)=>{

    const updateTodoInput = useRef<HTMLInputElement>(null);

    //submit the edited input of selected todo item 
    const onSubmitHandler =(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        const updateText = updateTodoInput.current!.value;
        const updateID =  props.todoId;
         
        if(updateText.trim().length === 0){
            return;
        }
        //update the array of todos in local storage
        const storedEditedTodos = localStorage.getItem('todos'); // get json string object of 'todos'
        const todos = storedEditedTodos ? JSON.parse(storedEditedTodos) : []; // is sET able to parse then parse is not the return empty array
        const editedTodos = todos.map((todo: any) => {
        if (todo.id === updateID) {
            todo.text = updateText; // update the array text to updateText 
        }
        return todo;
        });
        localStorage.setItem('todos', JSON.stringify(editedTodos)); // store the object of the editedTodo as a json string

        props.updateHandler(updateText, updateID)// take the value of enterText and id 
    }
    //linking the onCloseHandler of app.tsx to onClose so onclick is able to be read 
    const onClose=(event:React.MouseEvent)=>{
        event.preventDefault();
        props.closeHandler();
    }
    return(
       <form onSubmit={onSubmitHandler} className={classes.form}>
           <label>Edit Todo</label>
           <input type="text" ref={updateTodoInput} />
           <button>edit</button>
           <button onClick={onClose}>close</button>
       </form>
    )
}
export default EditForm