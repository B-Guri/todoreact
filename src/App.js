import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";


function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Lorem ipsum",
      completed: false
    },
    {
      id: 2,
      title: "text 2",
      completed: true
    }
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  const addNewTask = () => {
    if(newTaskText){
      const newTask = {
        id: Date.now(),
        title: newTaskText,
        completed: false
      }
      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  }

  const changeTaskComplete = (id) => {
    setTasks([...tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : {...task}  
    )]);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const deleteAll = ()  => {
    setTasks([]);
  }

  const deleteDone = () => {
    setTasks([...tasks.filter(task => task.completed === false)]);
  }

  return (
    <div>
      <div className="bg-primary container-fluid">
        <Container>
            <p className="text-white h1 text-center py-3">ToDoReact</p>
        </Container>
      </div>
      <Container>
          <Form className="border p-4">
            <Form.Group className="mb-2">
              <Form.Control 
                type="text" 
                placeholder="New Todo" 
                value={newTaskText} 
                onChange={e => {setNewTaskText(e.target.value)}}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" onClick={addNewTask}>Add new task</Button>
            </div>
          </Form>
          {tasks.length > 0
          ?
          <>
            <h2 className="text-center my-3 text-primary">Tasks</h2>
            {tasks.map(task => 
              <div key={task.id} className="border p-3 my-2 d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => changeTaskComplete(task.id)}
                />
                <h5 className={`mb-0 mx-2 flex-grow-1 text-wrap ${task.completed? "text-danger text-decoration-line-through":""}`}>{task.title}</h5>
                <div>
                    <Button onClick={() => {deleteTask(task.id)}} className="mx-1" variant="danger">Delete</Button>
                </div>
              </div>  
            )}
            <div className="d-flex gap-2 justify-content-end my-4">
                <Button variant="danger" onClick={deleteAll}>
                    Delete all tasks
                </Button>
                <Button variant="danger" onClick={deleteDone}>
                    Delete done tasks
                </Button>
            </div>
          </>
          :
            <h2 className="text-center my-3 text-primary">No active tasks</h2>
          }
      </Container>
    </div>
  );
}

export default App;
