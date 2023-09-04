import React from 'react'

const Die = ({ block, handleBlockClick }) => {
    const clicked = {
        backgroundColor: "#59E391"
    }

    return (
        <div
            style={block.saved ? clicked : null}
            className="Die"
            onClick={handleBlockClick}
        >
            {block.number}
        </div>
    )
}

export default Die
