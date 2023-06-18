import React, { useState, useEffect } from 'react';
import PostCard from '../../components/PostCard/PostCard';
import PrimaryButton from '../../components/shared/PrimaryButton/PrimaryButton';
import NoContant from '../../components/NoContant/NoContant';
import AddCard from '../../components/AddCard/AddCard';
import { openDB, addPost, getAllPost, updatePost, deletePost } from '../../db';

const Posts = () => {
    const [card, setCard] = useState(false);
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [postData, setPostData] = useState([]);
    const [editPostData, setEditPostData] = useState(false);
    const [buttonName, setButtonName] = useState('Create post');
    const [postId, setPostId] = useState(null);
    const [image, setImage] = useState('');
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isBookmark, setIsBookmark] = useState(false);

    let url = window.location.pathname;
    let currBoardId = url.split('/')[3];
    const date = new Date();

    const getMonthName = (monthNumber) => {
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'long' });
    }

    let currDate = `${date.getDate()}th ${getMonthName(date.getMonth() + 1)}`;

    // let currBoardId = useSelector((state) => state.boardIdReducer.boardId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (card === true && editPostData === false && subject && description && image && currDate) {
            await openDB().then(() => {
                addPost({ currBoardId, subject, description, image, currDate }).then((id) => {
                    console.log('Data added with ID: ', id);
                }).catch((error) => {
                    console.error('Failed to add data: ', error);
                });
            })
        } else if (editPostData === true && card === false) {
            await openDB().then(() => {
                updatePost(postId, { subject, description, image, currDate }).then(() => {
                    console.log('Data updated with ID: ', postId);
                }).catch((error) => {
                    console.error('Failed to update data: ', error);
                });
            })
        }
        setCard(false);
        window.location.reload();
    }

    useEffect(() => {
        openDB()
            .then(() => {
                getAllPost()
                    .then((data) => {
                        setPostData(data);
                    })
                    .catch((error) => {
                        console.error('Failed to retrieve data:', error);
                    });
            })
            .catch((error) => {
                console.error('Failed to open the database:', error);
            });
    }, []);

    let filteredPost = postData.filter((post)=>post.currBoardId === currBoardId);

    const handleOnClick = () => {
        card === true ? setCard(false) : setCard(true);
        setEditPostData(false);
        setButtonName('Create post');
        setPostId(null);
        setDescription('');
        setImage('');
    }

    const handleFileChange = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
        };

        reader.onerror = (event) => {
            console.error('Failed to read file:', event.target.error);
        };

        reader.readAsDataURL(file);
    }

    const handleDeletePost = async (post) => {
        await openDB().then(() => {
            deletePost(post?.id).then(() => {
                console.log('Data deleted with ID: ', post?.id);
            }).catch((error) => {
                console.error('Failed to deleted data: ', error);
            });
        });
        window.location.reload();
    }

    const handleLikeClick = () => {
        if (isLike === false) {
            setIsLike(true);
            setLikeCount(likeCount + 1);
        }
        else if (isLike === true) {
            setIsLike(false);
            setLikeCount(likeCount - 1);
        }
    }
    const handleBookmarkClick = () => {
        isBookmark ? setIsBookmark(false) : setIsBookmark(true);
    }

    return (
        <>
            <div className='bg-surfaceSelected h-full'>
                <div className='flex items-center'>
                    <h1 className='font-bold inline text-3xl ml-12 mt-5 mb-5'>Your posts</h1>
                    <div className='create-post-btn inline-block ml-auto mr-8'>
                        <PrimaryButton icon="plus" name="Create new post" onClick={handleOnClick} />
                    </div>
                </div>
                {card || editPostData ?
                    <AddCard buttonName={buttonName} onClick={handleOnClick} onSubmit={handleSubmit} >
                        <h2 className='font-bold text-xl mb-1'>Create a post</h2>
                        <p className='font-medium text-subtitle'>Write something for your post</p>
                        <div className='py-6 border-b-2 border-border mb-6'>
                            <h3 className='font-semibold text-gray48 mb-2'>Subject</h3>
                            <input onChange={(e) => setSubject(e.target.value)} className='w-full border-solid border-2 border-border rounded-md py-2 px-3 mb-3' type="text" name="subject" id="subject" placeholder='Write your subject' />
                            <input onChange={handleFileChange} type="file" id="select-image" hidden />
                            <label htmlFor="select-image" className='addImage flex items-center border-solid border-2 border-border rounded-md px-3 py-1 cursor-pointer'>
                                <img className='mr-3' src="/images/image-icon.png" alt="icon" />
                                <span className='font-semibold text-gray48'>Add your image</span>
                            </label>
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray48 mb-2'>What's on your mind?</h3>
                            <textarea onChange={(e) => setDescription(e.target.value)} className='resize-none border-2 border-border rounded-md p-3' name="post-body" id="post-body" cols="50" rows="3" placeholder='Type here'></textarea>
                        </div>
                    </AddCard> : null
                }

                {filteredPost.length > 0 ? <div className='ml-12 mr-8 pb-5 grid gap-10 grid-cols-4'>
                    {filteredPost?.map(post => (
                        <div key={post?.id}>
                            <PostCard subject={post?.subject} image={post?.image} desc={post?.description} date={post?.currDate} onEditClick={() => { setEditPostData(true); setButtonName('Update Post'); setPostId(post?.id); setSubject(post?.subject); setDescription(post?.description); setImage(post?.image); }} onDeleteClick={() => handleDeletePost(post)} onLikeClick={handleLikeClick} likeCount={likeCount} onBookmarkClick={handleBookmarkClick} bookmark={isBookmark} />
                        </div>))
                    }
                </div> : <NoContant type="post" />}
            </div>
        </>
    );
}

export default Posts;