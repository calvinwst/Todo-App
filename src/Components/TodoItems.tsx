import classes from "./TodoItem.module.css";

const TodoItems:React.FC<{text: string, isCompleted: boolean , onRemove:()=>void, onCompleted:()=>void , onEdit:()=> void}> = (props)=>{
    const completeItem = props.isCompleted ? 'item-completed' : 'item';
    return (
        <li className={classes[completeItem]}>
            {props.text}
            <button onClick={props.onRemove} className={classes.button}>x</button>
            <button onClick={props.onEdit} className={classes.button} disabled={props.isCompleted}>Edit</button>
            <button onClick={props.onCompleted} className={classes.button}>complete</button>
        </li>
    )
}
export default TodoItems;