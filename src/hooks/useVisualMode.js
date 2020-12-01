import { useState } from 'react';

const useVisualMode = (initialMode) => {
    const [ mode, setMode ] = useState(initialMode);
    const [ history, setHistory] = useState([])

    const transition = (newMode, replace) => {
        if (replace) {
            setMode(newMode)
        } else {
            setMode(newMode)
            setHistory(prev => [...prev, newMode])
        }
    }

    const goBack = () => {
        history.pop()
        if (history.length >= 1) {
            setMode(history[history.length - 1]);
        }
    }

    return { mode, transition, goBack };
}

export default useVisualMode;