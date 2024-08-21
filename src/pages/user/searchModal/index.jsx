import React, { useEffect, useState } from 'react';

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const [input, setInput] = useState('');
  const [open , setOpen] = useState(null)
useEffect(()=>{
    setOpen(isOpen)
})
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(input);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };
const handleClose = ()=>{
    onClose()
}
  return (
    open ?(
      <div className="search-modal">
        <div className="modal-content">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type and hit Enter to search"
          />
          <button onClick={() => onSearch(input)}>Search</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    ):null
  );
};

export default SearchModal;
