import { useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Checkbox, Modal } from '@mui/material'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import AddTask from './AddTask.tsx';
import ClearListButton from './ClearListButton.tsx';
import EditTask from './EditTask.tsx';

function ToDoList(){

  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [editTask, setEditTask] = useState<{
    index: number;
    task: string;
  }>({
    index: 0,
    task: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };


  const label = { inputProps: { 'aria-label': 'Checkbox' } };

  const handleCheckboxChange = (task: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(prevState => ({
      ...prevState,
      [task]: e.target.checked
    }))
  };

  function handleAddTask(newTask: string){
    if(newTask.trim() !== ""){
      setTasks(t => [...t, newTask]);
    }
  }

  function handleDeleteTask(index: number){
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleClearList(){
    if(tasks.length > 0){
      setTasks([]);
    }
    setTitle('');
  }
  
  // handle Add task modal
  const handleOpenNewTask = () => setOpenAddTaskModal(true);
  const handleCloseAddTaskModal = () => setOpenAddTaskModal(false);

  // handle edit task modal
  function handleEditTaskClick(index: number){
    const currentTask = tasks.find((_, i) => i === index) || '';
    setEditTask({
      index,
      task: currentTask
    }) 
    setOpenEditTaskModal(true);
  }

  function handleEditTask(index: number, value: string) {
    const newTasks = tasks.map((t, i) => i === index ? value : t);

    setTasks(newTasks);
    setEditTask({ index: 0, task: '' });
  }

  const handleCloseEditTaskModal = () => setOpenEditTaskModal(false);


  function moveTaskUp(index: number){
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = 
      [updatedTasks[index - 1], updatedTasks[index]]; 
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index: number){
    if (index < tasks.length - 1 ) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = 
      [updatedTasks[index + 1], updatedTasks[index]]; 
      setTasks(updatedTasks);
    }
  }

  return(
    <div className='to-do-list'>
      <div className='menu shadow'>
        <img src="./todolist.svg" alt="To do list icon" />
      </div>

      <div className='to-do-container'>
        <h2 className='karma-regular'>
          "Where focus goes, energy flows."
        </h2>
        
        <div className='title-container shadow rounded-corners'>
          <input className='title-input' type="text" maxLength={30} placeholder='TITLE' 
          onChange={handleChange}
          value={title}/>
        </div>

        <div className='list-container'>
          <div className='list shadow rounded-corners'> 
            <p id='first-item' style={{ display: tasks.length > 0 ? 'none' : '' }}>
              Add your first task!
            </p>

            <ol>
              {tasks.map((task,index) =>
                <li key={index}>
                  <Checkbox {...label} 
                    size='small'
                    sx={{
                      color: "#FEFAE0",
                      "&.Mui-checked": {
                        color: "#FEFAE0",
                      },
                    }}
                    checked={checked[task]}
                    onChange={(e) => handleCheckboxChange(task, e)}
                    className='checkbox'
                  />
                  <span className='text' style={{ textDecoration: checked[task] ? 'line-through' : '' }}>
                    {task}
                  </span>

                  <div className='button-container-fixed'>

                    <button 
                      className='item-button' 
                      onClick={() => moveTaskUp(index)} 
                      style={{ display: index === 0 ? 'none' : '' }}
                    >
                      <KeyboardDoubleArrowUpRoundedIcon />
                    </button>
                  </div>
                  <div className='button-container-fixed'>
                    <button 
                      className='item-button' 
                      onClick={() => moveTaskDown(index)} 
                    >
                      <KeyboardDoubleArrowDownRoundedIcon />
                    </button>
                  </div>

                  <div className='button-container-fixed'>
                    <button 
                      className='item-button' 
                      onClick={() => handleEditTaskClick(index)} 
                      style={{ display: checked[task] ? 'none' : '' }}
                    >
                      <ModeEditOutlinedIcon />
                    </button>
                  </div>
                  
                  <div className='button-container-fixed'>
                    <button 
                      className='item-button' 
                      onClick={() => handleDeleteTask(index)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  </div>
                </li>
              )}
            </ol>
          </div>

          <button className='add-item shadow' onClick={handleOpenNewTask}>
            <img src="/icon-plus.svg" alt="add item" className='icon-plus'/>
          </button>

          <ClearListButton onClearListButton={handleClearList} isDisabled={tasks.length === 0} />
        </div>
      </div>

      <Modal
        open={openAddTaskModal}
        onClose={handleCloseAddTaskModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddTask
          onAddTask={handleAddTask}
          onClose={handleCloseAddTaskModal} 
        />
      </Modal>

      <Modal 
        open={openEditTaskModal}
        onClose={handleCloseEditTaskModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditTask 
          onEditTask={handleEditTask}
          onClose={handleCloseEditTaskModal}
          currentTask={editTask}
        />
      </Modal>

    </div>
  );

}
export default ToDoList