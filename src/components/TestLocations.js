import React from 'react'; 
import Select from 'react-select'; 
import Axios from 'axios';
import './GlobalStats.css';
import Card from './cards';
import Grid from '@material-ui/core/Grid'; 
import CardContent from '@material-ui/core/CardContent';
import SimpleCard from './cards'; 
import States from './states'; 
import NumberFormat from 'react-number-format';


const url = 'https://covid-19-testing.github.io/locations';




class TestLocations extends React.Component{

    state = {
        name : 'New York', 
        data : [], 
        selectOptions : [], 
        hospitalNames : {},
        loading : true,
        initial : true,
        cases_initial : true,
        deaths :'32710',
        cases : '421464'
    };

    async fetchData(state){
        let changeableUrl =  `${url}/${state}/complete.json`; 
        try {
    
            const response = await Axios.get(changeableUrl);
            this.setState({data : response.data, loading : false})
            console.log(this.state.data);
            this.setState({initial : false});
            return response;
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
        console.log(data);
        const options = data.map(d => ({
            
            "label" : d.state,
            "thisDeaths" : d.death,
            "thisCases" : d.case,
            "date" : d.updated
          }))

          console.log(options);
          
          this.setState({selectOptions : options});
        }

   

    componentDidMount(){
        this.getOptions();
     
     }


     printHospitals(name, phone, address){
        return (
            <div>
                {name} 
    
            </div>
        ); 

     }

     async handleChange(e){
         //this.fetchData(e.label.toLowerCase());
         
         console.log(e);

         e.label = e.label.replace(/\s+/g, '-'); 
         console.log(e.label);
        console.log(e.thisDeaths); 
        console.log(e.thisCases);



         let changeableUrl = `${url}/${e.label.toLowerCase()}/complete.json`; 
         try {
    
             const response = await Axios.get(changeableUrl);
             this.setState({data : response.data, loading : false})
         }
         catch(error) {
             return error; 
         }


         this.setState({name : e.label, deaths : e.thisDeaths, cases : e.thisCases}); 
       



        //console.log('HERE' + response); 

        
    
        
        
        
         //this.setState( {hospitalNames : hospitals} ); 
         //console.log(this.state.hospitalNames);

     }  

    

     
     renderNames(){
        const names = this.state.data.map( ( d => {
            const phones = d.phones.map(phones => {
                return phones.number;
            })
            const addresses = d.physical_address.map(data => {
                return data.address_1;
            })

            return (
                

                <Grid item xs = {12} sm = {6} md = {4} >

                <SimpleCard title = {d.name} address = {addresses} phone = {phones} />

                </Grid>
                
            );




        }));
        return names;
    }
    

    renderInitialCases(){
        const data = this.state.data.map((d => {

            if (d.label === "New York"){
                return [d.cases, d.deaths]; 
            }

        }))

        this.setState({ cases_initial : false});
        return <div>{data[0]} {data[1]}</div>;
    }

   

    renderInitial(){
        this.fetchData('new-york');
      
        this.renderNames(); 
       
    }

  
   
    render(){


    
    return (
        <div>
    <div className = "title">State-Wise Statistics and Testing</div>
    

    
    <Select options = {this.state.selectOptions} onChange = {this.handleChange.bind(this)} placeholder = "Select State ..." value = ''/>

       <Grid container spacing = {2} style = {{marginTop : '5%', marginBottom:'3%'}}>

        <Grid item xs = {12} sm = {4} md = {4} lg = {4}>
            <div class = "stateName">

            {this.state.name}

            </div>

        </Grid>

        <Grid item xs = {12} sm = {4} md = {4} lg = {4}>
        <div class="ui statistic">
                        <div class="value">
                        <NumberFormat value={this.state.cases} displayType={'text'} thousandSeparator={true} />
                            </div>
                        <div class="label">
                            Cases
                        </div>
                    </div>
        </Grid>

        <Grid item xs = {12} sm = {4} md = {4} lg = {4}>
        <div class="ui statistic">
                        <div class="value">
                        <NumberFormat value={this.state.deaths} displayType={'text'} thousandSeparator={true} />
                            </div>
                        <div class="label">
                            Deaths
                        </div>
                    </div>
        </Grid>

       </Grid>

    <div className = "title">{this.state.name} Testing Locations</div>
    <Grid container spacing = {4}>
            {this.state.loading? this.renderInitial() : null}
            
            {this.renderNames()}
            



        </Grid>

    </div>
    );
    


}
}

export default TestLocations;