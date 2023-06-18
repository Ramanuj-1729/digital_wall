import React from 'react';

const PrimaryButton = ({ icon, name, onClick }) => {
    return (
        <div onClick={onClick} className={`bg-interactiveOneHover rounded-md flex items-center justify-center py-2 px-3 text-white font-medium cursor-pointer`}>
            {icon.length !== 0 && <img className="mr-2 w-4 h-4" src={`/images/${icon}.png`} alt="button icon" />}
            <span>{name}</span>
        </div>
    );
}

export default PrimaryButton;