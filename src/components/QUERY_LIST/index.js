import React from 'react'
import _ from 'lodash'
import {Paper, Typography} from '@material-ui/core'
import {inject, Observer} from 'mobx-react'

import SearchSelect from './../base/select'
import DataTable from '../base/table'

@inject('queryModel')
@Observer
export default class Output extends React.Component {
  state = {
    output: false,
    response: null,
    showDropdown: false,
    dropDownResults: [],
    query: null,
    selectedValue: '',
  }
  
  showDropdown = (response) => {
    this.setState({
      showDropdown: true,
      dropDownResults: response
    })
  }
  
  showOutput = (response) => {
    this.setState({
      response,
      output: true,
    })
  }
  executeQuery = (e) => {
    if(_.isNil(this.props.query)) {
      return
    }
    let query = this.props.query
    query = query(e.value)
    console.log('Executing' + query)
    console.log('Sending' + e.value)
    this.setState({query: query, selectedValue: e.value})
    this.props.queryModel.executeQuery(query, {success:this.showOutput})   
  }
  componentDidUpdate = (prevProps) => {
    if(prevProps.index !== this.props.index) {
      this.setState({response: null, output: false, selectedValue:'', query:''})
    }
  }
  
  render = () => {
    const options = this.props.queryModel.dataStore[this.props.dataKey]
    return(
      <div>
      <Typography variant="h4" style={{ textAlign:"center", marginLeft:"2%"}}>
      {this.props.question}
      </Typography>
      <br/>
      <Paper style={{height:'75%', width: '100%',}}>
      <br/>
      <div class="content">
      <div class="typo-line">
      <p class="category" style={{marginLeft:"2%"}}>{this.props.dataKey}</p>
      <blockquote>
      <p>
      <SearchSelect options={options} placeholder={this.props.placeholder} selectedValue= {this.state.selectedValue} onChange={this.executeQuery} />
      </p>
      </blockquote>
      </div>
      </div>
      <br/>  
      {this.renderQueryPage()}
      </Paper>
      </div>
      )
    }
    renderQueryPage = ()=> {
      return(
        <div class="content">
        <div class="typo-line">
        <p class="category" style={{marginLeft:"2%"}}>Query</p>
        <blockquote>
        <p>
        <code>{this.state.query}
        </code>
        </p>
        </blockquote>
        </div>
        <br/>
        <div class="typo-line">
        <p class="category" style={{marginLeft:"2%"}}>Output</p>
        <blockquote>
        <p>
        {this.state.output && this.renderResponse()}
        </p>
        </blockquote>
        </div>
        <br/>
        </div>
        )
      }
      
      renderResponse = () =>{
        return <DataTable response={this.state.response} />
      }
    }