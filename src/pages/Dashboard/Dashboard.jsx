import React, { useState, useEffect } from 'react';
import Board from '../../components/Board/Board';
import AddCard from '../../components/AddCard/AddCard';
import { useDispatch, useSelector } from 'react-redux';
import { toggleState } from '../../Slices/BoardCardToggleSlice';
import { openDB, addBoard, getAllBoard, updateBoard, deleteBoard } from '../../db';
import { useNavigate } from 'react-router-dom';
import NoContant from '../../components/NoContant/NoContant';
import { boardIdState } from '../../Slices/BoardIdSlice';
import { boardN } from '../../Slices/BoardSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const isToggle = useSelector((state) => state.boardCardReducer.isToggle);
    const searchText = useSelector((state) => state.searchReducer.searchText);
    const dispatch = useDispatch();

    const [boardName, setBoardName] = useState("");
    const [color, setColor] = useState("");
    const [boardData, setBoardData] = useState([]);
    const [editBoardData, setEditBoardData] = useState(false);
    const [buttonName, setButtonName] = useState('Create board');
    const [boardId, setBoardId] = useState(null);

    const handleOnClick = () => {
        dispatch(toggleState());
        setEditBoardData(false);
        setButtonName('Create board');
        setBoardId(null);
        setBoardName('');
        setColor('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isToggle === true && editBoardData === false && boardName && color) {
            await openDB().then(() => {
                addBoard({ boardName, color }).then((id) => {
                    console.log('Data added with ID: ', id);
                }).catch((error) => {
                    console.error('Failed to add data: ', error);
                });
            })
        } else if (editBoardData === true && isToggle === false) {
            await openDB().then(() => {
                updateBoard(boardId, { boardName, color }).then(() => {
                    console.log('Data updated with ID: ', boardId);
                }).catch((error) => {
                    console.error('Failed to update data: ', error);
                });
            })
        }
        dispatch(toggleState());
        window.location.reload();
    }

    const handleDeleteBoard = async (board) => {
        await openDB().then(() => {
            deleteBoard(board?.id).then(() => {
                console.log('Data deleted with ID: ', board?.id);
            }).catch((error) => {
                console.error('Failed to deleted data: ', error);
            });
        });
        window.location.reload();
    }

    useEffect(() => {
        openDB()
            .then(() => {
                getAllBoard()
                    .then((data) => {
                        setBoardData(data);
                    })
                    .catch((error) => {
                        console.error('Failed to retrieve data:', error);
                    });
            })
            .catch((error) => {
                console.error('Failed to open the database:', error);
            });
    }, []);

    const handleBoardClick = (board) => {
        dispatch(boardIdState(board?.id));
        navigate(`/dashboard/posts/${board?.id}`);
        dispatch(boardN(board?.boardName));
    }

    let filteredBoard = boardData.filter((board) => board.boardName === searchText);
    console.log(filteredBoard);

    return (
        <>
            <h1 className='font-bold text-3xl ml-12 mt-5 mb-5'>My boards</h1>
            {searchText === filteredBoard.at(0)?.boardName ?
                <div className='ml-12 mr-8 grid gap-10 grid-cols-3'>
                    <Board color={filteredBoard.at(0)?.color} title={filteredBoard.at(0)?.boardName} onEditClick={() => { setEditBoardData(true); setButtonName('Update board'); setBoardId(filteredBoard.at(0)?.id); setBoardName(filteredBoard.at(0).boardName); setColor(filteredBoard.at(0).color); }} onDeleteClick={() => handleDeleteBoard(filteredBoard.at(0))} onBoardClick={() => { handleBoardClick(filteredBoard.at(0)) }} />
                </div>
                :
                boardData.length > 0 ?
                    <div className='ml-12 mr-8 grid gap-10 grid-cols-3'>
                        {boardData?.map(board => (
                            <div key={board?.id}>
                                <Board color={board?.color} title={board?.boardName} onEditClick={() => { setEditBoardData(true); setButtonName('Update board'); setBoardId(board?.id); setBoardName(board.boardName); setColor(board.color); }} onDeleteClick={() => handleDeleteBoard(board)} onBoardClick={() => { handleBoardClick(board) }} />
                            </div>
                        ))}</div>
                    :
                    <NoContant type="board" />
            }
            {isToggle || editBoardData ?
                <AddCard buttonName={buttonName} onClick={handleOnClick} onSubmit={handleSubmit} >
                    <h2 className='text-black text-lg font-semibold mb-2'>Add a name for your board</h2>
                    <input className='border-2 border-border rounded-md p-2 w-full mb-5' placeholder='Board name' type="text" name="boardName" id="board-name" onChange={(e) => setBoardName(e.target.value)} />
                    <h2 className='text-black text-lg font-semibold mb-1'>Select board colour</h2>
                    <p className='font-light text-sm mb-3'>Here are some templates to help you get started</p>
                    <div className='colors'>
                        <span onClick={() => setColor("blue90")} className='w-8 h-8 cursor-pointer mr-2 bg-blue90 inline-block rounded-full hover:border-2 hover:border-teal'></span>
                        <span onClick={() => setColor("violet80")} className='w-8 h-8 cursor-pointer mr-2 bg-violet80 inline-block rounded-full hover:border-2 hover:border-teal'></span>
                        <span onClick={() => setColor("pink70")} className='w-8 h-8 cursor-pointer mr-2 bg-pink70 inline-block rounded-full hover:border-2 hover:border-teal'></span>
                        <span onClick={() => setColor("yellow70")} className='w-8 h-8 cursor-pointer bg-yellow70 inline-block rounded-full hover:border-2 hover:border-teal'></span>
                    </div>
                </AddCard> : null
            }
        </>
    );
}

export default Dashboard;