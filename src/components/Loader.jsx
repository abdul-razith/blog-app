import React from 'react'

const Loader = () => {
    return (
        /* From Uiverse.io by Javierrocadev */
        <div className="flex flex-row gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
    )
}

export default Loader