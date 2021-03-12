import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core';

const SwitchGrid = styled.div`
    border: 4px solid rgb(104, 44, 254);
    border-radius: 5px;
    margin-left: 0.25em;
    width: 95%;
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    -webkit-box-align: center;
    align-items: center;
    font-family: "Baloo Tamma 2", cursive;
    font-weight: 600;
    font-size: 1.5em;
    color: rgb(110, 110, 110);
`

const SwitchStyle = makeStyles({
    root: {
        width: 120,
        height: 80,
        marginTop:20,
        marginLeft:80,
    },
    switchBase: {
      padding: 17,
      '&$checked': {
        transform: 'translateX(40px)',
        color: "white",
        '& + $track': {
          backgroundColor: '#7530ff',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
        width:30,
        height:30,
    },
    track: {
        width: 80,
        height: 40,
        borderRadius: 26,
        backgroundColor: '#d5cce6',
    },
    checked: {},
    focusVisible: {},
})

export default function SwitchState(props) {
    const switchStyle = SwitchStyle();

    return(
        <SwitchGrid>
            <Switch
                classes={{
                    root: switchStyle.root,
                    switchBase: switchStyle.switchBase,
                    thumb: switchStyle.thumb,
                    track: switchStyle.track,
                    checked: switchStyle.checked}}
                onChange={(e) => props.onChange(!props.staticData)}
                color="primary"
            />
            <p>Static</p>
        </SwitchGrid>
    )
}