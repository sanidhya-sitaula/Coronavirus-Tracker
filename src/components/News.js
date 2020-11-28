import React from 'react'; 
import Select from 'react-select'; 
import Axios from 'axios';

const url = "https://api.smartable.ai/coronavirus/news"; 


class News extends React.Component {



    state  = { 

        selectOptions : [],
        loading : true,
        data : []
    }
    

    async getNews(state) {

    let changeableUrl = `${url}/${state.toLowerCase()}`; 

    try {


        const response = await fetch(changeableUrl, {
            method : 'GET', 
            headers : {
                "Subscription-Key" : "312b7c6765344f738ab3dd7120d83368"
            }
            
            
        }); 

        console.log(response);
       
       
        this.setState({data : response.data, loading : false})
    }
    catch(error) {
        return error; 
    }

    }


    async getOptions() {
    
        const res = await Axios.get('https://finnhub.io/api/v1/covid19/us', 
        
        {
            params : {
                token : 'bsj288frh5rc8orbqhh0'
            }
        }
        
        ); 

        const data = res.data;

        const options = data.map(d => ({
            "label" : d.state,
            "date" : d.updated
          }))

        
          this.setState({selectOptions : options});
        }


        componentDidMount(){
            this.getOptions();
         
         }
    

        async handleChange(e) {
            await this.getNews(e.label); 
            console.log(this.state.data); 
 
        }


    render(){

        return (

            <Select options = {this.state.selectOptions} onChange = {this.handleChange.bind(this)} placeholder = "Select State ..." />
            

        ); 
    }



}

export default News; 