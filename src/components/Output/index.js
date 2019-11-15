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
      <div style={{marginLeft: '10%'}}>
      <Paper>
        <Typography variant="h5">
      {this.props.question}
      </Typography>
      <br/>
      </Paper>
      <br/><br/>
      <Paper>
        <Typography variant="h6">Query:</Typography>
      {this.props.query}
      <br/>
      <br/>
      </Paper>
      <br/> <br/>
      {this.state.output && this.renderResponse()}
      </div>
      )
    }
    
    renderResponse = () =>{
      console.log('Table updated')
      const {response} = this.state
      const columns = process_json(response)
      const data = process_json_data(response)      
      
      return(
        <MaterialTable
        columns={columns}
        data={data}
        title="Results"
        options={{headerStyle: {backgroundColor: '#039be5',}}}
        />
        )
      }
    }