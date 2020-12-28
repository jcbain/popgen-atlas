import useScrollTrigger from '../../../../hooks/useScrollTrigger';

const useTriggers = ( mainRef, migrationTrigger, appearTrigger, growTrigger ) => {

    const [ isMigrate ] = useScrollTrigger(mainRef, migrationTrigger);
    const [ isAppear ] = useScrollTrigger(mainRef, appearTrigger);
    const [ isGrow ] = useScrollTrigger(mainRef, growTrigger, true);

    return { isMigrate, isAppear, isGrow };
}

export default useTriggers;