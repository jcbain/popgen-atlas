import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import {createLabel} from '../helpers/Helpers';


const StyledFormControl = styled(FormControl)`
&& {
  min-width: ${props => props.optionsize}vw;
  margin-right: 1px;
}
`;

export default function ParameterSet(props) {

    const [val, setVal] = React.useState(props.initVal);
    const [open, setOpen] = React.useState(false);

    const handleSelection = props.changeSelection;
    const handleChange = (event) => {
      setVal(event.target.value);
      console.log(event.target.name)
      handleSelection(event.target.name, event.target.value);
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


  
    return (
      <div >
        <StyledFormControl optionsize={props.optionSize}>
          <InputLabel className="tmp-class">{props.label}</InputLabel>
          <Select
            labelId={createLabel('selection', props.label)}
            id={createLabel('selection', props.label)}
            name={props.paramShort}
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
