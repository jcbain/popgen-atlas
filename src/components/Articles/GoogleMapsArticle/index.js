import React from 'react';
import styled from 'styled-components';
import GMap from './GMap'

const Text = styled.div`
    position: relative;
    width: 30vw;
    margin-left: 60vw;
`;

const GoogleMapArticle = () => {
    return (
        <article>
            <GMap />
        </article>
    )
}

export default GoogleMapArticle;