import { useEffect } from 'react';
import WebFont from 'webfontloader';

const useFonts = () => {

    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Roboto', 'Rubik', 'Orelega One']
          }
        });
    }, []);
}

export default useFonts;