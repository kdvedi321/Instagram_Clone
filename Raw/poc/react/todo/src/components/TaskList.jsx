import React from 'react'; //imr
const TaskList = (props) => {
    let {list, rTask} = props;
    return (<div>{
        list.map((task) => {
            return(
                <div className="task" key={task.id}>
                    <span className="mr-4">{task.name}</span>
                    <button className="btn btn-danger" onClick={()=>{
                        rTask(task.id)
                    }}>X</button>
                </div>
            )
        })
    }</div> );
}
 
export default TaskList; // sfc