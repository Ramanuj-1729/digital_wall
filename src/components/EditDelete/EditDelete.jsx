import React from 'react';

const BoardFunction = ({onEditClick, onDeleteClick}) => {
    return (
        <div className='card_wrapper rounded-lg bg-white drop-shadow-md p-2'>
            <div onClick={onEditClick} className='edit flex items-center my-2 cursor-pointer'>
                <img className='mr-2 w-4 h-4' src="/images/edit.png" alt="edit" />
                <span className='text-gray48 font-normal'>Edit</span>
            </div>
            <div onClick={onDeleteClick} className='delete flex items-center my-2 cursor-pointer'>
                <img className='mr-2 w-4 h-4' src="/images/delete.png" alt="edit" />
                <span className='text-interactiveOneDefault font-normal'>Delete</span> 
            </div>
        </div>
    );
}

export default BoardFunction;