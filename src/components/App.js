import React from 'react';
import ajax from 'ajax';
import CountryList from './countries';
import GlobalStats from './GlobalStats'
import './App.css';
import { Button } from '@material-ui/core';
import { NativeSelect } from '@material-ui/core';
import Graph from './graph';  
import States from './states';
import Chart from './chart';
import CountryPicker from './countrypicker'; 
import { fetchData } from '../api/virustracker';
import TestLocations from './TestLocations';
import News2 from './News2';
import Iframe from 'react-iframe';
import CountryProfile from './CountryProfile'; 
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'; 


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});



class App extends React.Component{

 constructor(props){
   super(props); 
    this.state = {
    country : '',
    data : {}
  }; 




 }

 async componentDidMount(){
   const data = await fetchData(); 

   this.setState({ data });

}
 
  

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }


  render() {
    const {data, country} = this.state;
    return (

    
      <div class = "container">
       <div class = "banner">
          <h1 class = "bannerTitle">Track COVID-19</h1>

       </div>
        
      <div class = "dashboard"><GlobalStats /></div>
      <div class = "lower-part">

          <h1 class = "title">Country-Wise Statistics</h1>
          <div> <CountryList /></div>

      </div>

        

    







          

          

      <div class = "graph">
      <h1 class = "title">Visualization</h1>
      <div><CountryPicker handleCountryChange = {this.handleCountryChange} /></div>
      <div><Chart data = {data} country = {this.state.country} /></div>
      </div>


     


      <div class = "testing" id = "testing">
      <ThemeProvider theme={theme}>


        <TestLocations />
        </ThemeProvider>
      </div>
       
       
      <div class = "news">
        <h1 class = "title">Latest News</h1>
        <News2 />
      </div>
   

    </div>
     
    );
  }

}



export default App;
