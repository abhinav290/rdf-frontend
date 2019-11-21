import { observable, action } from "mobx";
import ApiService from './../services/ApiService'
import {process_json_data} from './../utils'
import { QUERY_MAP, KEYS } from "../consts";
import _ from 'lodash'

class QueryModel {
    @observable 
    queryOutput ={}

    @observable
    dataStore={}
    
    @action
    getOutput = () => {
        return this.queryOutput
    }
 
    @action
    setOutput = (output) => {
        this.queryOutput = output
    }
    @action
    getDataStore = () => {
        if(_.isEmpty(this.dataStore)) {
            for(const key in KEYS) {
              this.getDataStoreItem(KEYS[key])
            }
        }
        return this.dataStore
    }
 
    @action
    setDataStore = (output) => {
        this.dataStore = output
    }

    @action
    getDataStoreItem = async (key) => {
        if(_.isEmpty(this.dataStore[key])) {
            await this.fetchData(key, QUERY_MAP[key])
        }
        return this.dataStore[key]
    }
 
    @action
    setDataStore = (key, output) => {
        this.dataStore[key] = output
    }

    @action
    executeQuery = async(query, callback) => {
        const response = await ApiService.executeQuery({query})
        if(response.ok) {
            this.setOutput(response.data)
            callback.success(response.data)
        } else {
            callback.failure()
        }
    }

    @action fetchData = async (key, query) => {
        const response= await ApiService.executeQuery({query})
        if(response.ok && !_.isEmpty(response.data)) {
            let data = process_json_data(response.data)
            data=data.sort((a,b) => a.name > b.name)
            this.setDataStore(key, data)
        }
    }
}

export default new QueryModel()
export { QueryModel }