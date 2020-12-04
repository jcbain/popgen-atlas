import React, { useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GMap from './GMap'
import SimWorld from './SimWorld/index.js'
import { Helmet } from 'react-helmet'
import { useLoadScript } from '@react-google-maps/api';
import { random } from 'lodash'

import useVisualMode from '../../../hooks/useVisualMode'
import usePopData from '../../../hooks/usePopData'

import { GlobalStyle } from '../../../theme/globalStyle'

// https://www.youtube.com/watch?v=WZcxJGmLbSo
// moved this here for renderirng purposes

const Text = styled.div`
    position: relative;
    width: 30vw;
    margin-left: 60vw;
    font-family: 'Mukta', sans-serif;
    font-size: 18px;
`;


const TextSection = styled.p`
    background-color: #fff;
    padding: 10%;
    border-radius: 5px;
    margin-bottom: 50vh;
`
const GoogleMapArticle = () => {

    const { mode, transition, goBack } = useVisualMode("BUDDY");
    const width = 400,
          height = 400;

    const { popData, loaded } = usePopData(100, 100);

    console.log(popData)
    const data = generateData(height-50, width-50, 100);
    console.log(data)
          

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const mapRef = useRef(null)
    const mapTrigger = useRef(null)
    const panRef = useRef(null)
    const panTrigger = useRef(null)
    const vizTrigger = useRef(null)
    const migrationRef = useRef(null)
    const migrationTrigger = useRef(null);
    const disappearTrigger = useRef(null);
    const shrinkTrigger = useRef(null)


    const mapRefs = {
        mapRef: mapRef,
        mapTrigger: mapTrigger
    }
    const panRefs = {
        ref: panRef,
        trigger: panTrigger
    }
    const vizRefs = {
        ref: panRef,
        trigger: vizTrigger
    }

    const buddyRefs = {
        ref: migrationRef,
        trigger: migrationTrigger,
        disappearTrigger: disappearTrigger,
        shrinkTrigger: shrinkTrigger 
    }

    if (!isLoaded) return "Loading";
    return (
        <ThemeProvider theme={{mainbackground: '#f7f7f7'}}>
            <GlobalStyle mainbackground='#fcfcfc' />
            <article>
                <Helmet>
                    <title>Local Adaptation</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Mukta&display=swap" rel="stylesheet" /> 
                </Helmet>
                {mode === "MAP" && <GMap ref={mapRef} mapRefs={mapRefs} vizRefs={vizRefs} panRefs={panRefs}/>}
                {mode === "BUDDY" && <SimWorld ref={migrationRef} buddyRefs={buddyRefs} data={popData['g1']} loaded={loaded} width={width} height={height}/>}
                <Text>
                    <TextSection>Here is a map. It is a cool map and it begs to be looked at.</TextSection>
                    <TextSection ref={mapTrigger}>Actually this is the map and it still begs to be looked at</TextSection>
                    <TextSection ref={vizTrigger}>This is where all of those lodgepoll pines are. In other word, this is their distribution.</TextSection>
                    <TextSection ref={panTrigger}>Let's take a closer look</TextSection>
                    <TextSection ref={migrationTrigger}>Here we have 2 populations. 10% from each will migrate</TextSection>
                    <TextSection ref={shrinkTrigger}>Just a new batch of offspring coming along</TextSection>
                    <TextSection ref={disappearTrigger}>Some will die off. You know...like they do</TextSection>
                </Text>
            </article>
        </ThemeProvider>
    )
}

const flippedy = (prob) => Math.random() < prob ? true : false;


function generateData(height, width, num) {
    const minY = (height/2) - height,
          maxY = height/2
    let data = [];
    for(let i = 0; i < num; i++) {
        const popOne = {posX: random(0,  width/2 - 20), posY: random(minY, maxY), transfer: flippedy(0.1), willDie: flippedy(0.5)},
              popTwo = {posX: random(width/2 + 20, width), posY: random(minY, maxY), transfer: flippedy(0.1), willDie: flippedy(0.1)};
        data.push({ popOne, popTwo })
    }

    return data;
}

export default GoogleMapArticle;