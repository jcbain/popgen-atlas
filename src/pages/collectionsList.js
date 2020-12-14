import React from 'react';
import LocalAdaptation from './collections/LocalAdaptation';
import Map from './collections/Map';

const collectionsList = [
    {
        id: 'local-adaptation',
        title: 'Local Adaptation',
        description: 'A little description will go a long way',
        component: LocalAdaptation,
    }, {
        id: 'google-map',
        title: 'Gooogle Map',
        description: 'You really think this description is going to cut it?',
        component: Map,
    }, 
    {
        id: 'temp-1',
        title: 'Gophers are Really Cool',
        description: 'But have you ever considered marmots?',
        component: Map,

    }, 
    {
        id: 'temp-2',
        title: 'Scenic Pizza',
        description: "You know what I'm talking about",
        component: Map,
    }
]

export default collectionsList;