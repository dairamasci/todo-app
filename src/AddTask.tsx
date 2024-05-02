import { useState } from 'react';

type Props = {
  onAddTask: (newTask: string) => void;
  onClose: () => void;
};

function AddTask({ onAddTask, onClose}: Props){
  const [newTask, setNewTask] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    setNewTask(e.target.value);
  }

  function handleAddTask(){
    if(newTask.length > 2) {
      onAddTask(newTask);
      setNewTask('');
      onClose();
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>){
    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim() !== '') {
      handleAddTask();
    }
  }

  return (

    <div className='add-task-container shadow rounded-corners'>
      <textarea 
        name="task" 
        id="textarea-task" 
        cols={50} 
        rows={3}
        placeholder='Enter a task...'
        value={newTask}
        onChange={handleInputChange}
        maxLength={50}
        autoFocus
        onKeyDown={handleEnter}
        >
      </textarea>

      <div className='button-container'>
        <button 
          className='add-task shadow rounded-corners' onClick={handleAddTask} 
          disabled={newTask.length < 3 } 
        >
          Confirm
        </button>
        <button className='cancel-add-task shadow rounded-corners' onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddTask;