import { observable, action } from "mobx";
import ApiService from './../services/ApiService'

class QueryModel {
    @observable 
    queryOutput ={}
    
    @action
    getOutput = () => {
        return this.queryOutput
    }
 
    @action
    setOutput = (output) => {
        this.queryOutput = output
    }

    @action
    executeQuery = async(query, callback) => {
        console.log('Query' + query)
        const response = await ApiService.executeQuery({query})
        if(response.ok) {
            this.setOutput(response.data)
            callback.success(response.data)
        } else {
            callback.failure()
        }
    }
}

export default new QueryModel()
export { QueryModel }