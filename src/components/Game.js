import React, { useState } from 'react'
import Die from './Die'
import Confetti from 'react-confetti';

const Game = ({ setRolls, intervalId }) => {
    const [blocks, setBlocks] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [btnText, setBtnText] = useState("")

    function startGame() {
        setRolls(0)
        setBlocks([])

        for (let i = 0; i < 10; i++) {
            const block = {
                index: i,
                number: Math.ceil(Math.random() * 6),
                saved: false
            }
            
            setBlocks(prevBlocks => ([
                ...prevBlocks,
                block
            ]))
        }
    }

    function handleBlockClick(block) {
        const newBlock = {
            ...block,
            saved: !block.saved
        }

        setBlocks(prevBlocks => prevBlocks.map(block => {
            return block.index === newBlock.index ? newBlock : block
        }))
    }

    function handleButtonClick() {
        if (gameOver) {
            startGame()
        }
        else {
            setRolls(prevRolls => prevRolls + 1)

            const newBlocks = blocks.map(block => {
                if (block.saved) {
                    return block
                }
                else {
                    const newBlock = {
                        ...block,
                        number: Math.ceil(Math.random() * 6)
                    }
                    return newBlock
                }
            })

            setBlocks(newBlocks)
        }
    }

    React.useEffect(() => {
        startGame()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // check if game over
    React.useEffect(() => {
        if (blocks.length === 10) {
            const allSaved = blocks.every(block => block.saved === true)
            const allSame = blocks.every(block => block.number === blocks[0].number)

            if (allSaved && allSame) {
                setGameOver(true)
            }
            else {
                setGameOver(false)
            }
        }
    }, [blocks])

    React.useEffect(() => {
        if (gameOver && intervalId) {
            setBtnText("Play Again")
            clearInterval(intervalId)
        }
        else {
            setBtnText("Roll")
        }
    }, [gameOver, intervalId])

    return (
        <div className="Game">
            {gameOver && <Confetti />}
            <div className="blocks-container">
                {blocks.map(block => {
                    return (
                        <Die 
                            block={block}
                            handleBlockClick={() => handleBlockClick(block)}
                            key={block.index}
                        />
                    )
                })}
            </div>
            <button onClick={handleButtonClick}>{btnText}</button>            
        </div>
    )
}

export default Game
