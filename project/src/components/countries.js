import React from 'react'; 
import { render } from '@testing-library/react';
import './countries.css'; 
import ReactTable from 'react-table';
import NumberFormat from 'react-number-format';
import CountryProfile from './CountryProfile'; 
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button } from '@material-ui/core';


class CountryList extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        name : '',
        deaths : 0,
        cases : 0, 
        loading : true,
        country_stats : []

    };

  async componentDidMount() {
    //get stats for each country 
    const url_countries = 'https://api.thevirustracker.com/free-api?countryTotals=ALL'; 
    const response_countries = await fetch(url_countries); 
    const data_countries = await response_countries.json()
    console.log(data_countries)
    this.setState({country_stats : data_countries.countryitems[0]});
    this.setState({loading : false});

 
  }  

 
    
    renderTable(){

       


        let results = Object.values(this.state.country_stats);
        let results2 = Object.values(results);
        
        const countries = results2.map( (country) => {
            let countryCode = country.code + ' flag'; 

            return (
            <tr>
            <td> <i className =  {countryCode.toLowerCase()} ></i>{country.title}</td>
                <td> <NumberFormat value={country.total_cases} displayType={'text'} thousandSeparator={true} /></td>
                <td> <NumberFormat value={country.total_deaths} displayType={'text'} thousandSeparator={true} /></td>
                <td> <NumberFormat value={country.total_recovered} displayType={'text'} thousandSeparator={true} /></td>
                <td> <NumberFormat value={country.total_new_cases_today} displayType={'text'} thousandSeparator={true} /></td>
                <td> <NumberFormat value={country.total_new_deaths_today} displayType={'text'} thousandSeparator={true} /></td>

                

             </tr>
             ) ;
        
          });

        return countries;
          
    }

    doNothing() {
        return true;
    }

    render(){
      return (
        <div>
          <div class = "column">

        <div className = 'tableStyle'>
          <table className = "ui sortable celled table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Total Cases</th>
                <th>Total Deaths</th>
                <th>Total Recovered</th>
                <th>New Cases Today</th>
                <th>New Deaths Today</th>
                </tr>
            </thead>
              <tbody>
                {this.state.loading ? this.doNothing() : this.renderTable()}   
              </tbody>
            </table>
          </div>
          </div>


          <div class = "column">

          </div>
          </div>
          ); 

      }



}



export default CountryList;