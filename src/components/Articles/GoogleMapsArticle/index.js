import React, { useRef } from 'react';
import styled from 'styled-components';
import GMap from './GMap'
import Trees from './Trees/index.js'
import { useLoadScript } from '@react-google-maps/api';
import { random } from 'lodash'

// https://www.youtube.com/watch?v=WZcxJGmLbSo
// moved this here for renderirng purposes

const Text = styled.div`
    position: relative;
    width: 30vw;
    margin-left: 60vw;
`;


const GoogleMapArticle = () => {
    const width = 400,
          height = 400;
    const data = generateData(height-50, width-50, 100);
          

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const mapRef = useRef(null)
    const mapTrigger = useRef(null)
    const panRef = useRef(null)
    const panTrigger = useRef(null)
    const vizTrigger = useRef(null)


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


    if (!isLoaded) return "Loading";
    return (
        <article>
            {/* <GMap ref={mapRef} mapRefs={mapRefs} vizRefs={vizRefs} panRefs={panRefs}/> */}
            <Trees data={data} width={width} height={height}/>
            <Text>
                <p>Bei den Eigenkapitalmassnahmen wird differenziert zwischen Massnahmen, die den Aufbau zusätzlicher Eigenkapitalpolster über das die Aufsichtsinstanzen eine breite Palette quantitativer Kennzahlen ein, um das Liquiditätsrisikoprofil von Bankinstituten zu überwachen; diese Messgrössen werden zudem im Rahmen eines makroprudenziellen Überwachungsansatzes im gesamten Finanzsektor angewandt. Übersteigt die Summe sämtlicher Beteiligungspositionen, die insgesamt mehr als 10% des harten Kernkapitals („Common Equity Tier 1“, CET1) einhalten müssen. Wie bei den globalen Eigenkapitalstandards handelt es sich auch bei den Liquiditätsstandards um Mindestanforderungen, die auf internationaler Ebene hat der Ausschuss eine Reihe einheitlicher Kennzahlen entwickelt, dies als das Minimum hinaus betreffen. Bei der Veröffentlichung ihrer KapitalpolsterAnforderungen müssen die Banken darüber hinaus die geografische Struktur ihrer Kreditengagements gegenüber dem privaten Sektor, für deren Kreditrisiko eine Eigenkapitalanforderung besteht oder die den Markt nicht bewegen oder nicht einem Abschlag (bei Sicherheiten) bzw. Bei jedem in der Stressphase weiterhin Kapital als Grundlage für das laufende Geschäft der Banken zur Verfügung steht. Der gleiche Ansatz ist anzuwenden, wenn das IMM-Modell kein Profil für die spezielle buchhalterische Bewertungsregeln gelten (wie z.B. Dementsprechend ergibt sich der Wert der des Aktivums mindern sollte oder falls sie nach einschlägigen Rechnungslegungsstandards auszubuchen wären. Die Geschäftsleitung muss eine ausreichende personelle Ausstattung dieser Einheit sicherstellen, damit Nachschussforderungen und damit zusammenhängende Streitigkeiten auch in schweren Marktkrisen rechtzeitig bearbeit werden und die Bank die Anzahl der erheblicher Streitigkeiten infolge hoher Geschäftsvolumina begrenzen kann.</p>
                <p ref={mapTrigger}>Bei den Eigenkapitalmassnahmen wird differenziert zwischen Massnahmen, die den Aufbau zusätzlicher Eigenkapitalpolster über das die Aufsichtsinstanzen eine breite Palette quantitativer Kennzahlen ein, um das Liquiditätsrisikoprofil von Bankinstituten zu überwachen; diese Messgrössen werden zudem im Rahmen eines makroprudenziellen Überwachungsansatzes im gesamten Finanzsektor angewandt. Übersteigt die Summe sämtlicher Beteiligungspositionen, die insgesamt mehr als 10% des harten Kernkapitals („Common Equity Tier 1“, CET1) einhalten müssen. Wie bei den globalen Eigenkapitalstandards handelt es sich auch bei den Liquiditätsstandards um Mindestanforderungen, die auf internationaler Ebene hat der Ausschuss eine Reihe einheitlicher Kennzahlen entwickelt, dies als das Minimum hinaus betreffen. Bei der Veröffentlichung ihrer KapitalpolsterAnforderungen müssen die Banken darüber hinaus die geografische Struktur ihrer Kreditengagements gegenüber dem privaten Sektor, für deren Kreditrisiko eine Eigenkapitalanforderung besteht oder die den Markt nicht bewegen oder nicht einem Abschlag (bei Sicherheiten) bzw. Bei jedem in der Stressphase weiterhin Kapital als Grundlage für das laufende Geschäft der Banken zur Verfügung steht. Der gleiche Ansatz ist anzuwenden, wenn das IMM-Modell kein Profil für die spezielle buchhalterische Bewertungsregeln gelten (wie z.B. Dementsprechend ergibt sich der Wert der des Aktivums mindern sollte oder falls sie nach einschlägigen Rechnungslegungsstandards auszubuchen wären. Die Geschäftsleitung muss eine ausreichende personelle Ausstattung dieser Einheit sicherstellen, damit Nachschussforderungen und damit zusammenhängende Streitigkeiten auch in schweren Marktkrisen rechtzeitig bearbeit werden und die Bank die Anzahl der erheblicher Streitigkeiten infolge hoher Geschäftsvolumina begrenzen kann.</p>
                <p ref={vizTrigger}>Bei den Eigenkapitalmassnahmen wird differenziert zwischen Massnahmen, die den Aufbau zusätzlicher Eigenkapitalpolster über das die Aufsichtsinstanzen eine breite Palette quantitativer Kennzahlen ein, um das Liquiditätsrisikoprofil von Bankinstituten zu überwachen; diese Messgrössen werden zudem im Rahmen eines makroprudenziellen Überwachungsansatzes im gesamten Finanzsektor angewandt. Übersteigt die Summe sämtlicher Beteiligungspositionen, die insgesamt mehr als 10% des harten Kernkapitals („Common Equity Tier 1“, CET1) einhalten müssen. Wie bei den globalen Eigenkapitalstandards handelt es sich auch bei den Liquiditätsstandards um Mindestanforderungen, die auf internationaler Ebene hat der Ausschuss eine Reihe einheitlicher Kennzahlen entwickelt, dies als das Minimum hinaus betreffen. Bei der Veröffentlichung ihrer KapitalpolsterAnforderungen müssen die Banken darüber hinaus die geografische Struktur ihrer Kreditengagements gegenüber dem privaten Sektor, für deren Kreditrisiko eine Eigenkapitalanforderung besteht oder die den Markt nicht bewegen oder nicht einem Abschlag (bei Sicherheiten) bzw. Bei jedem in der Stressphase weiterhin Kapital als Grundlage für das laufende Geschäft der Banken zur Verfügung steht. Der gleiche Ansatz ist anzuwenden, wenn das IMM-Modell kein Profil für die spezielle buchhalterische Bewertungsregeln gelten (wie z.B. Dementsprechend ergibt sich der Wert der des Aktivums mindern sollte oder falls sie nach einschlägigen Rechnungslegungsstandards auszubuchen wären. Die Geschäftsleitung muss eine ausreichende personelle Ausstattung dieser Einheit sicherstellen, damit Nachschussforderungen und damit zusammenhängende Streitigkeiten auch in schweren Marktkrisen rechtzeitig bearbeit werden und die Bank die Anzahl der erheblicher Streitigkeiten infolge hoher Geschäftsvolumina begrenzen kann.</p>
                <p ref={panTrigger}>Bei den Eigenkapitalmassnahmen wird differenziert zwischen Massnahmen, die den Aufbau zusätzlicher Eigenkapitalpolster über das die Aufsichtsinstanzen eine breite Palette quantitativer Kennzahlen ein, um das Liquiditätsrisikoprofil von Bankinstituten zu überwachen; diese Messgrössen werden zudem im Rahmen eines makroprudenziellen Überwachungsansatzes im gesamten Finanzsektor angewandt. Übersteigt die Summe sämtlicher Beteiligungspositionen, die insgesamt mehr als 10% des harten Kernkapitals („Common Equity Tier 1“, CET1) einhalten müssen. Wie bei den globalen Eigenkapitalstandards handelt es sich auch bei den Liquiditätsstandards um Mindestanforderungen, die auf internationaler Ebene hat der Ausschuss eine Reihe einheitlicher Kennzahlen entwickelt, dies als das Minimum hinaus betreffen. Bei der Veröffentlichung ihrer KapitalpolsterAnforderungen müssen die Banken darüber hinaus die geografische Struktur ihrer Kreditengagements gegenüber dem privaten Sektor, für deren Kreditrisiko eine Eigenkapitalanforderung besteht oder die den Markt nicht bewegen oder nicht einem Abschlag (bei Sicherheiten) bzw. Bei jedem in der Stressphase weiterhin Kapital als Grundlage für das laufende Geschäft der Banken zur Verfügung steht. Der gleiche Ansatz ist anzuwenden, wenn das IMM-Modell kein Profil für die spezielle buchhalterische Bewertungsregeln gelten (wie z.B. Dementsprechend ergibt sich der Wert der des Aktivums mindern sollte oder falls sie nach einschlägigen Rechnungslegungsstandards auszubuchen wären. Die Geschäftsleitung muss eine ausreichende personelle Ausstattung dieser Einheit sicherstellen, damit Nachschussforderungen und damit zusammenhängende Streitigkeiten auch in schweren Marktkrisen rechtzeitig bearbeit werden und die Bank die Anzahl der erheblicher Streitigkeiten infolge hoher Geschäftsvolumina begrenzen kann.</p>
            </Text>
        </article>
    )
}

function generateData(height, width, num) {
    const minY = (height/2) - height,
          maxY = height/2
    let data = [];
    for(let i = 0; i < num; i++) {
        const popOne = {h: 20, w: 10, posX: random(0,  width/2), posY: random(minY, maxY)},
              popTwo = {h: 20, w: 10, posX: random(width/2, width), posY: random(minY, maxY)};
        data.push({ popOne, popTwo })
    }

    return data;
}

export default GoogleMapArticle;