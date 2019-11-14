import React from 'react'
import { Paper, Button } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import { inject } from 'mobx-react'


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
  class YasguiComponent extends React.Component {
    state={
        query:'',
        output: false,
        buttonDisabled: false
    }

    showOutput = (response) => {
      console.log('Response' + JSON.stringify(response))
      this.setState({buttonDisabled: false,
        response,
        output: true
    })
  }
  alertUser = () => {
    alert('Invalid query')
    this.setState({
      buttonDisabled:false
    })
  }
    handleOnClick = () => {
        console.log(this.state.query)
        this.setState({buttonDisabled: true,
          output:false,
          response: null
        })
        this.props.queryModel.executeQuery(this.state.query, {success: this.showOutput, failure: this.alertUser })
        return
    }
    handleQueryChange = (e) => {
        this.setState({query : e.target.value })
    }

    render = () => {
        const {classes}= this.props
        return(<div>
            <Paper>
            <Button variant="contained" color="primary" className={classes.button} disabled={this.state.buttonDisabled} value={this.state.query} onClick={this.handleOnClick}>
               Execute
            </Button>
            <br/>
            <textarea className={classes.textarea} placeholder="Enter your query here" color='#b0b1b0' 
                spellCheck={false} onBlur={this.handleQueryChange}/>
            <br/><br/>
        </Paper>
        <br/>
        {this.state.output && this.renderResponse()}
        </div>
        )
    }

renderResponse = () =>{
    return(
    <MaterialTable
    columns={[
      { field: "name" },
      { title: "Last Name", field: "surname" },
      { title: "Year", field: "birthYear", type: "numeric" },
      {
        title: "City",
        field: "birthCity",
        lookup: {63: "ABC", 65: "DEF"}
      }
    ]}
    data={[
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 65 }
    ]}
    title="Results"
    options={{headerStyle: {backgroundColor: '#039be5',}}}
    />
    )
}
}
export default withStyles(styles)(YasguiComponent)