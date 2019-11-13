import { observable, action } from "mobx";
import ApiService from './../services/ApiService'

class QueryModel {
    @observable 
    queryOutput ={}
    
    @action 
    loadOutput = async () => {
         const data = await ApiService.sample_output ()
         this.queryOutput = JSON.parse(JSON.stringify(data))
         console.log('Update' + JSON.stringify(this.queryOutput))
    }
    @action
    getOutput = () => {
        return this.queryOutput
    }
}

export default new QueryModel()
export { QueryModel }