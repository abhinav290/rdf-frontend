import { observable, action } from "mobx";
import ApiService from './../services/ApiService'

class QueryModel {
    @observable 
    queryOutput ={}
    
    @action 
    loadOutput = async (callback) => {
        const data = await ApiService.sample_output ()
        this.queryOutput = JSON.parse(JSON.stringify(data))
        callback(this.queryOutput)
    }
    @action
    getOutput = () => {
        return this.queryOutput
    }
    @action
    executeQuery = async(query, callback) => {
        const response = await ApiService.executeQuery({query})
        
        if(response.ok) {
            this.queryOutput = JSON.parse(JSON.stringify(response.data))
            callback.success(this.queryOutput)
        } else {
            callback.failure(this.queryOutput)
        }
    }
}

export default new QueryModel()
export { QueryModel }