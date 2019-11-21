import React from 'react'
import SelectSearch from 'react-select-search'

/**
* The options array should contain objects.
* Required keys are "name" and "value" but you can have and use any number of key/value pairs.
*/


export default class SearchSelect extends React.Component {

    render =() => { 
        /* Simple example */
        let options =this.props.options
        console.log('Selected' + this.props.selectedValue)
        return (<SelectSearch options={options}  name="language"  value= {this.props.selectedValue} placeholder={this.props.placeholder} onChange={this.props.onChange}/>)
    }
}