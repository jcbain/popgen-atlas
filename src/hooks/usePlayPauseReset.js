import { useState, useEffect, useCallback } from 'react';

const usePlayPauseReset = (script, resetter, stepInterval) => {

    const [ play, setPlay ] = useState(false);
    const [ currentPosition, setCurrentPosition ] = useState(0);

    const reset = useCallback(() => {
        setCurrentPosition(0);
        resetter();
        setPlay(false);
    }, [resetter])

    useEffect(() => {
        let interval = null;
        if (play) {
            interval = setInterval(() => {
                setCurrentPosition( s => {
                    if (s >= script.length) {
                        reset();
                    } else {
                        script[s]['action']();
                        return s + 1
                    }
                });
            }, 1000 * stepInterval);
        } else if (!play && currentPosition !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [play, currentPosition, stepInterval, reset, script])

    return [ setPlay, reset, play, currentPosition ]

}

export default usePlayPauseReset;