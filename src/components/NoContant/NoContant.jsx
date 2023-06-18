import React from 'react';

const NoContant = ({type}) => {
    return (
        <div className='flex items-center justify-center flex-col mt-20 pb-[292px]'>
            <img src="/images/NoPost.png" alt="No Contant" />
            <h4 className='text-black font-bold mb-3'>Nothing here yet</h4>
            <p className='text-black font-normal'>{`Create your first ${type} by clicking on the '+' buttton above`}</p>
        </div>
    );
}

export default NoContant;