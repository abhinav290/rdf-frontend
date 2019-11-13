import React from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import { Container, AppBar, Typography } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import TextSpace from '../base/textarea'

@inject('queryModel')
@observer
class Home extends React.Component {
 
  useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }))

  componentDidMount = () => {
    const {queryModel} = this.props
    queryModel.loadOutput()
  }
  
  render = () => {
    const text = this.props.queryModel.getOutput()
        return (
          <Container>
            <div class="row">
              <AppBar>
                <Typography variant="h6" className={{flexGrow: 1}}>
                  Knowledge And Data Engineering
                </Typography>
              </AppBar>
            </div>
            <div class="row">
            <br/><br/>
            <TextSpace text={text } />

            <div>
            <MaterialTable
            columns={[
              { title: "First Name", field: "name" },
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
            title="Answers"
            options={{headerStyle: {backgroundColor: '#039be5',}}}
        />
        </div>
        </div>
        </Container>
        )    
        }
}

export default Home;