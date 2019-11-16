import React from 'react'
import {Paper, Typography} from '@material-ui/core'
import MaterialTable from 'material-table'
import {inject, Observer} from 'mobx-react'
import {process_json, process_json_data} from '../../utils'
import _ from 'lodash'
@inject('queryModel')
@Observer
export default class Output extends React.Component {
  state = {
    output: false,
    response: null
  }
  
  showOutput = (response) => {
    this.setState({
      response,
      output: true
    })
  }
  executeQuery = () => {
    if(_.isNil(this.props.query)) {
      return
    }
    this.props.queryModel.executeQuery(this.props.query, {success:this.showOutput})   
  }
  
  componentDidMount= () => {
    this.executeQuery()
  }
  componentDidUpdate = (prevProps) => {
    if(prevProps.index !== this.props.index) {
      this.setState({response: null, output: false})
      this.executeQuery()
    }
  }
  
  render = () => {
    return(
      <div>
      <Paper>
        <br/>
      <Typography variant="h4" style={{marginLeft:"2%"}}>
      {this.props.question}
      </Typography>
      <br/>      
      <div class="content">
      <div class="typo-line">
      <p class="category" style={{marginLeft:"2%"}}>Query</p>
      <blockquote>
      <p>
      {this.props.query}        
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
      </Paper>
      </div>
      )
    }
    
    renderResponse = () =>{
      const {response} = this.state
      const columns = process_json(response)
      const data = process_json_data(response)      
      
      return(
        <MaterialTable
        columns={columns}
        data={data}
        title="Results"
        options={{headerStyle: {backgroundColor: '#039be5'}}}
        />
        )
      }
    }