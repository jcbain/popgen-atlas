import React, { useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GMap from './GMap'
import SimWorld from './SimWorld/index.js'
import { Helmet } from 'react-helmet'
import { useLoadScript } from '@react-google-maps/api';
import { animated, useSpring } from 'react-spring'

import useScrollTrigger from '../../../hooks/useScrollTrigger';
import useVisualMode from './hooks/useVisualMode';
import usePopData from './hooks/usePopData';
import useTriggers from './hooks/useTriggers';


// https://www.youtube.com/watch?v=WZcxJGmLbSo
// moved this here for renderirng purposes

const ArticleContainer  = styled.article`
    width: 100%;
`;

const VizContainer = styled(animated.div)`
    position: sticky;
    top: 0px;
`

const Text = styled.div`
    position: relative;
    font-family: 'Mukta', sans-serif;
    font-size: 18px;
    width: 20%;
    margin-left: 70%;
`;


const TextSection = styled.p`
    background-color: #fff;
    padding: 10%;
    border-radius: 5px;
    margin-bottom: 50vh;
    border: 3px solid #303030;
`
const GoogleMapArticle = () => {

    const { mode, transition, goBack } = useVisualMode("MAP");

    

    const width = 400,
          height = 400;

    const { popData, loaded } = usePopData(30, 30);



    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const mapRef = useRef(null)
    const mapShowTrigger = useRef(null);
    const mapDisappearTrigger = useRef(null);
    const migrationRef = useRef(null)
    const migrationTrigger = useRef(null);
    const disappearTrigger = useRef(null);
    const shrinkTrigger = useRef(null)

    const mapRefs = {
        main: useRef(null),
        trigger: useRef(null)
    }

    const buddyRefs = {
        ref: migrationRef,
        trigger: migrationTrigger,
        disappearTrigger: disappearTrigger,
        shrinkTrigger: shrinkTrigger 
    }

    const [ showMap ] = useScrollTrigger(mapRef, mapShowTrigger);
    
    const springProps = useSpring({opacity: showMap ? 1: 0});

    const { isMigrate, isAppear, isGrow } = useTriggers(migrationRef, migrationTrigger, disappearTrigger, shrinkTrigger)

    if (!isLoaded) return "Loading";


    return (

            <ArticleContainer>
                <Helmet>
                    <title>Local Adaptation</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Mukta&display=swap" rel="stylesheet" /> 
                </Helmet>
                <VizContainer style={springProps}>
                    {mode === "MAP" && <GMap ref={mapRef} refs={mapRefs} />}
                    {mode === "BUDDY" && (
                        <SimWorld ref={migrationRef} buddyRefs={buddyRefs} data={popData['g1']} loaded={loaded} width={width} height={height} 
                                  disappear={isAppear}
                                  migrate={isMigrate}
                                  grow={isGrow}
                        />
                    )}
                </VizContainer>
                
                <Text>
                    <TextSection>Here is a map. It is a cool map and it begs to be looked at.</TextSection>
                    <TextSection ref={mapShowTrigger}>Actually this is the map and it still begs to be looked at</TextSection>
                    <TextSection>This is where all of those lodgepoll pines are. In other word, this is their distribution.</TextSection>
                    <TextSection ref={mapRefs.trigger}>Let's take a closer look</TextSection>
                    <TextSection>This is where all of those lodgepoll pines are. In other word, this is their distribution.</TextSection>
                    <TextSection ref={migrationTrigger}>Here we have 2 populations. 10% from each will migrate</TextSection>
                    <TextSection ref={shrinkTrigger}>Just a new batch of offspring coming along</TextSection>
                    <TextSection ref={disappearTrigger}>Some will die off. You know...like they do</TextSection>
                </Text>
            </ArticleContainer>
    )
}


export default GoogleMapArticle;