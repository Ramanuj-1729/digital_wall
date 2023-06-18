import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { toggleState } from '../../../Slices/BoardCardToggleSlice';
import { search } from '../../../Slices/SearchSlice';

const Navbar = () => {
    const [searchText, setSearchText] = useState();
    const boardN = useSelector((state)=>state.boardReducer.boardN);
    let url = window.location.href;
    let display = true;
    url.indexOf('posts') > 0 ? display = false : display = true;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleOnClick = () => {
        dispatch(toggleState());
    }

    const handleOnEnter = (e) => {
        // e.preventDefault();
        if (e.key === 'Enter') {
            dispatch(search(searchText));
            e.target.value = '';
        }
    }

    return (
        <>
            <div className='navbar_wrapper py-3 pl-12 pr-8 border-b-2 border-border'>
                <div className={`${display === true ? 'flex' : 'hidden'} items-center justify-center`}>
                    <div className='brand_name'>
                        <NavLink to="/dashboard">
                            <img src="/images/logo.png" alt="brand-name" />
                        </NavLink>
                    </div>
                    <div className='right_items ml-auto flex items-center justify-center'>
                        <div className='search_bar flex items-center justify-center border-solid border-2 border-border rounded-md py-2'>
                            <img className='mx-3' src="/images/search.png" alt="search" />
                            <input onChange={(e) => setSearchText(e.target.value)} onKeyPress={handleOnEnter} className='text-textPlaceholder mr-2' type="text" name="search" id="search" placeholder='Search..' />
                        </div>
                        <div className='nav_btn ml-10'>
                            <PrimaryButton icon="plus" name="Create new board" onClick={handleOnClick} />
                        </div>
                    </div>
                </div>
                <div className={`${display === false ? 'flex' : 'hidden'}`}>
                    <div className='relative flex items-center justify-center'>
                        <img onClick={() => navigate('/dashboard')} className='absolute -left-6 cursor-pointer' src="/images/arrow.png" alt="back-btn" />
                        <img src="/images/logo-min.png" alt="logo-min" />
                        <h3 className='ml-4 text-textDefault font-semibold'>{boardN}d</h3>
                    </div>
                    <div className='ml-auto flex items-center justify-center space-x-3'>
                        <span className='border-r-2 border-border pr-3'>
                            <img className='cursor-pointer' src="/images/search.png" alt="search" />
                        </span>
                        <img className='cursor-pointer' src="/images/bookmark.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;