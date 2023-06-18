import React from 'react';
import PrimaryButton from '../shared/PrimaryButton/PrimaryButton';

const AddCard = ({ buttonName, onClick, onSubmit, children }) => {
    return (
        <div className='z-10 addCard absolute bg-black bg-opacity-80 h-full w-full top-0 right-0 left-0 bottom-0 border-2 flex items-center justify-center'>
            <div className='form_wrapper relative bg-white rounded-md p-5'>
                <img onClick={onClick} className='absolute right-5 top-5 cursor-pointer h-4 w-4' src="/images/close.png" alt="close" />
                {children}
                <div className='addCardBtn inline-block relative float-right mt-5'>
                    <PrimaryButton icon="" name={buttonName} onClick={onSubmit} />
                </div>
            </div>
        </div>
    );
}

export default AddCard;