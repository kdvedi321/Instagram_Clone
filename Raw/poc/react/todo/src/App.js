// imrc
import React, { Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import InputBox from "./components/InputBox";
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
class App extends Component {
  state = {
    tasks: [{id:"1", name:"Learn JS"},
    {id:"2", name:"Learn Es6"},
    {id:"3", name:"Learn React"}]
  }
  removeTask = (toBeRemovedid) => {
    let { tasks } = this.state;
    let remainingTasks = tasks.filter((task) => {
      return task.id != toBeRemovedid
    });
    this.setState({ tasks: remainingTasks});
  }
  addTask = (taskName) => {
    let { tasks } = this.state;
    tasks.push({id: tasks.length+1, name: taskName})
    this.setState({ tasks: tasks });
  }
  render() {
    let {tasks} = this.state;
    return(
      <React.Fragment>
        <InputBox addTask={this.addTask}></InputBox>
        <TaskList list={tasks} rTask={this.removeTask}></TaskList>
      </React.Fragment>
    );
  }
}
export default App;