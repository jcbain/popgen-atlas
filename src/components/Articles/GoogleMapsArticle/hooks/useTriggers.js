import useScrollTrigger from '../../../../hooks/useScrollTrigger';

const useTriggers = ( appear ) => {

    const [ isAppear ] = useScrollTrigger(appear.main, appear.trigger, false);

    return { isAppear };
}

export default useTriggers;