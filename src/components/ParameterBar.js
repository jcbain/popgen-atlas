import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';



class ParameterBar extends Component{
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleClose.bind(this)
        this.state= {
            age: '',
            open: false,
        }
    }

    handleChange(event){
        this.setState({age: event.target.value})

    }


    handleOpen(){
        console.log(this.state.open)
        this.setState({open: true})
    }

    handleClose(){
        console.log(this.state.open)
        this.setState({open: false})
    }

    render(){
        return(
            <div>
                <FormControl >
                    <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.age}
                        onChange={this.handleChange}>
                        <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

            </div>

        )

    }
}

export default ParameterBar;