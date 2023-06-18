import React, { useState } from 'react';
import EditDelete from '../EditDelete/EditDelete';

const PostCard = ({ subject, image, desc, date, onEditClick, onDeleteClick, onLikeClick, likeCount, onBookmarkClick, bookmark }) => {
    const [editDelete, setEditDelete] = useState(false);

    const handleOnClick = () => {
        editDelete === true ? setEditDelete(false) : setEditDelete(true);
    }
    return (
        <div className='bg-white drop-shadow-md p-5 rounded-md'>
            <div className='flex items-center'>
                <h2 className='font-bold text-lg'>{subject}</h2>
                <div className='flex items-center justify-center space-x-1 ml-auto'>
                    <svg onClick={onBookmarkClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`cursor-pointer ${bookmark===true ? 'fill-yellow70' : 'fill-gray48'} bi bi-bookmark`} viewBox="0 0 16 16"> <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" /> </svg>
                    <img onClick={() => handleOnClick()} className='cursor-pointer h-4 w-4' src='/images/dots.png' alt='dots' />
                    <div className='z-10 absolute board_function -right-7 top-12'>
                        {editDelete === true && <EditDelete onEditClick={onEditClick} onDeleteClick={onDeleteClick} />}
                    </div>
                </div>
            </div>
            <span className='font-normal text-xs text-gray48'>{date}</span>
            <div className='mt-3 flex flex-col items-center justify-center cursor-pointer'>
                <img className='rounded-md mb-3' src={image} alt="post-img" />
                <p className='font-normal text-subtitle text-justify'>{desc}</p>
            </div>
            <div className='flex items-center mt-2 space-x-2 font-medium'>
                <svg onClick={onLikeClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`cursor-pointer ${likeCount > 0 ? 'fill-primary' : 'fill-gray48'} bi bi-heart`} viewBox="0 0 16 16"> <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" /> </svg>
                <span>{likeCount}</span>
            </div>
        </div>
    );
}

export default PostCard;