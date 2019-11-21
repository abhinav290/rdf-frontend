import React from 'react'
import {process_json, process_json_data} from './../../../utils'
import MaterialTable from 'material-table'

export default class DataTable extends React.Component{
    render =() => {
        const {response} = this.props
        const columns = process_json(response)
        const data = process_json_data(response)
        return(
            <MaterialTable
            columns={columns}
            data={data}
            title="Results"
            options={{headerStyle: {backgroundColor: '#9471d5',color: "#ffffff", fontSize:"1.6rem"},
            cellStyle:{fontSize:"1.4rem"}}}
            />
            )
        }
    }