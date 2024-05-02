type Props = {
  onClearListButton: () => void;
  isDisabled: boolean;
};

function ClearListButton({onClearListButton, isDisabled}: Props) {

  return(
    
    <button 
      className="clear-list shadow rounded-corners" 
      onClick={onClearListButton} disabled={isDisabled}
      >
      Clear all
    </button>
  );
}

export default ClearListButton;