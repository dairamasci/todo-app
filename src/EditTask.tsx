import { useState } from 'react';
type Props = {
  onEditTask: ( index: number, editedTask: string ) => void;
  onClose: () => void;
  currentTask: {
    index: number;
    task: string;
  }
};

function EditTask({ onEditTask, onClose, currentTask }: Props){
  
  const [editedTask, setEditedTask] = useState(currentTask.task);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    setEditedTask(e.target.value);
  }

  function handleEditTask(){

    if(editedTask.length > 2) {
      onEditTask(currentTask.index, editedTask);
      setEditedTask('');
      onClose();
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>){
    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim() !== '') {
      handleEditTask();
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
        maxLength={50}
        autoFocus
        value={editedTask}
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        >
      </textarea>

      <div className='button-container'>
        <button 
          className='add-task shadow rounded-corners' onClick={handleEditTask} 
          disabled={editedTask.length < 3 } 
        > 
          Confirm
        </button>
        <button className='cancel-add-task shadow rounded-corners' onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );


} export default EditTask