import React from 'react'
import { Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Button } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import { inject, Observer } from 'mobx-react'
import {process_json, process_json_data} from '../../utils'
import _ from 'lodash'

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
    marginRight: '5%',
    float: 'right'
  },
  textarea: {
    width: '90%',
    height: '150px',
    marginLeft: '5%' 
  }
})

@inject('queryModel')
@Observer
class EditableQueryComponent extends React.Component {
  state={
    query:null,
    output: false,
    buttonDisabled: false,
    open: false
  }
  
  showOutput = (response) => {
    this.setState({buttonDisabled: false,
      response,
      output: true
    })
  }
  alertUser = () => {
    this.setState({
      open: true
    })
  }
  enableButton = () => {
    this.setState({
      buttonDisabled:false,
      open:false
    })
  }
  
  executeQuery = () => {
    if(_.isNil(this.state.query)) {
      return
    }
    this.props.queryModel.executeQuery(this.state.query, {success:this.showOutput, failure: this.alertUser})   
  }
  
  handleOnClick = () => {
    
    this.setState({buttonDisabled: true,
      output:false,
      response: null
    })
    this.executeQuery()
    console.log('Clicked' + this.state.query)
  }
  
  handleQueryChange = (e) => {
    console.log()
    this.setState({query : e.target.value })
  }
  
  render = () => {
    const {classes}= this.props
    return(<div>
      <Paper>
      <Grid justify="space-between" container spacing={24}>
      <Grid item>
      <Typography type="title" variant="h4" color="inherit" style={{marginBlockStart: '5%', marginLeft:'5%', width: '240px'}}>
      Query Interface
      </Typography>
      </Grid>
      
      <Grid item>
      <Button variant="contained" color="primary" className={classes.button} disabled={this.state.buttonDisabled} value={this.state.query} onClick={this.handleOnClick}>
      Execute
      </Button>
      </Grid>
      </Grid>
      
      <br/>
      <textarea className={classes.textarea} placeholder="Enter your query here" color='#b0b1b0' 
      spellCheck={false} onBlur={this.handleQueryChange}/>
      <br/><br/>
      </Paper>
      <br/>
      {this.state.output && this.renderResponse()}
      {this.renderAlert()}
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
        options={{headerStyle: {backgroundColor: '#039be5',}}}
        />
        )
      }
      
      renderAlert = () => {
        return (<Dialog
          open={this.state.open}
          onClose={this.enableButton}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Issue occured"}</DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
          A problem occured while executing the query.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.enableButton} color="primary" autoFocus>
          OK
          </Button>
          </DialogActions>
          </Dialog>)
        }
      }
      export default withStyles(styles)(EditableQueryComponent)