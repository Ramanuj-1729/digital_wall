import React, { useState } from 'react';
import EditDelete from '../EditDelete/EditDelete';

const Board = ({ color, title, onEditClick, onDeleteClick, onBoardClick }) => {
    const [editDelete, setEditDelete] = useState(false);

    const handleOnClick = () => {
        editDelete === true ? setEditDelete(false) : setEditDelete(true);
    }
    return (
        <>
            <div className="relative border-solid border-2 border-border rounded-md flex items-center justify-center" >
                <div onClick={onBoardClick} className="flex items-stretch justify-center cursor-pointer">
                    <span className={`-z-10 mr-5 w-12 bg-${color}`}></span>
                    <span className="inline-block my-4 text-textDefault font-medium">{title}</span>
                </div>
                <img onClick={() => handleOnClick()} className="w-4 h-4 ml-auto mr-4 cursor-pointer" src="/images/dots.png" alt="dots" />
                <div className='z-10 absolute board_function -right-7 -bottom-20'>
                    {editDelete === true && <EditDelete onEditClick={onEditClick} onDeleteClick={onDeleteClick} />}
                </div>
            </div>
        </>
    );
}

export default Board;
