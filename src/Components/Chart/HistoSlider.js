import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import React, { useState } from "react";
import styled from 'styled-components';

const margin = { top: 80, right: 40, bottom: 70, left: 70 };

const HistogramStyle= styled.div`
    float: right;
    margin-top: 1%;
    margin-left: 20px;
    width: 1000px;
    height: 500px;
    background: white;
    border-radius: 10px;
`
const HistogramSlider = withStyles({
  root: {
    color: '#6f00ff',
    width: 850,
    marginLeft: margin.left,
    marginTop: margin.top
  },
  thumb: {
    height: 45,
    width: 45,
    backgroundColor: '#fff',
    border: '7px solid currentColor',
    marginTop: -16,
    marginLeft: -20,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {
    color: '#7530ff',
  },
  valueLabel: {
    left: 'calc(-50% + 15px)',
  },
  track: {
    height: 11,
    borderRadius: 4,
  },
  rail: {
    backgroundColor: '#808080',
    height: 11,
    borderRadius: 4,
  },
})(Slider);

export default function HistoSlider(props) {
  const [selection, setSelection] = useState(2000);
  const children = props.children;

  return (
    <HistogramStyle>
      {children(selection)}
        <HistogramSlider
          valueLabelDisplay="auto"
          valueLabelFormat={value => <div>{value/1000 + 'k'}</div>}
          defaultValue={2000}
          min={2000}
          max={250000}
          step={2000}
          onChange={(e, val) => setSelection(val)}
        />
    </HistogramStyle>
  );
}