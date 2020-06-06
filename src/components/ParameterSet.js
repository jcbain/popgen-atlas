import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import {createLabel} from '../helpers/Helpers';

export default function ParameterSet(props) {

    const [val, setVal] = React.useState(props.initVal);
    const [open, setOpen] = React.useState(false);

    const handleSelection = props.changeSelection;
    const handleChange = (event) => {
      setVal(event.target.value);
      handleSelection(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    const menuOpts = props.options
                .map(d => (
                    <MenuItem key={createLabel(props.label, d)} value={d}>{d}</MenuItem>
            ))

    const StyledFormControl = styled(FormControl)`
      && {
        min-width: 7vw;
      }
    `;
    const StyledInputLabel = styled(InputLabel)`
      && {
        color: #000;
      }
    `;
  
    return (
      <div >
        <StyledFormControl>
          <StyledInputLabel className="tmp-class">{props.label}</StyledInputLabel>
          <Select
            labelId={createLabel('selection', props.label)}
            id={createLabel('selection', props.label)}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={val}
            onChange={handleChange}
          >
              {menuOpts}
          </Select>
        </StyledFormControl>
      </div>
    );
  }
