import React from 'react'

const PageLoader = ({message}) => {
    return (
        /* From Uiverse.io by Cybercom682 */
        <div className="text-center">
            <div
                className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
            ></div>
            <h2 className="text-zinc-900 mt-4">{message ? message : "Your Content is Loading..."}</h2>
        </div>

    )
}

export default PageLoader