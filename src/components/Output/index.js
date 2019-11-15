import React from 'react'
import TextSpace from '../base/textarea'
import {Paper} from '@material-ui/core'
import MaterialTable from 'material-table'
import {inject} from 'mobx-react'
@inject('queryModel')
export default class Output extends React.Component {
render = () => {
    const text = this.props.queryModel.getOutput()
    return(<div>
        <Paper>
        <TextSpace text={text } />
        <br/> 
        </Paper>
<br/>
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
title="Results"
options={{headerStyle: {backgroundColor: '#039be5',}}}
/>
</div>
)
}    
}