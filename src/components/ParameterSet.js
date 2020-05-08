import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {createLabel} from '../helpers/Helpers';




  export default function ParameterSet(props) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: props.minWidth,
        },
      }));

    const classes = useStyles();
    const [val, setVal] = React.useState('');
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
  
    return (
      <div >
        <FormControl className={classes.formControl}>
          <InputLabel>{props.label}</InputLabel>
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
        </FormControl>
      </div>
    );
  }


// class ParameterSet extends Component{
//     constructor(props){
//         super(props);
//         this.handleOpen = this.handleOpen.bind(this)
//         this.handleClose = this.handleClose.bind(this)
//         this.handleChange = this.handleClose.bind(this)
//         this.state = {
//             opt: '',
//             open: false,
//         }
//     }

//     handleChange(event){
//         this.setState({opt: event.target.value})

//     }


//     handleOpen(){
//         this.setState({open: true})
//     }

//     handleClose(){
//         this.setState({open: false})
//     }

//     render(){
//         const menuOpts = this.props.options
//             .map(d => (
//                 <MenuItem value={d}>{d}</MenuItem>
            
//         ))
//         return(
//             <div>
//                 <FormControl>
//                     <InputLabel>{this.props.label}</InputLabel>
//                     <Select
//                         labelId={`id-${this.props.label}`}
//                         // id="demo-controlled-open-select"
//                         open={this.state.open}
//                         onClose={this.handleClose}
//                         onOpen={this.handleOpen}
//                         value={this.opt}
//                         onChange={this.handleChange}>
//                     {menuOpts}
//                         {/* <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem> */}
//                     </Select>
//                 </FormControl>

//             </div>

//         )

//     }
// }

// export default ParameterSet;