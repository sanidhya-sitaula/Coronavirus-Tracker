import React from 'react';
import './App.css';
import axios from 'axios';
import './states.css';
import Select from 'react-select'; 
import { cleanup } from '@testing-library/react';
import NumberFormat from 'react-number-format';


class States extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      selectOptions : [], 
      id : "",
      name : '',
      cases : 0, 
      deaths : 0,
      date : '',
    }
  }

  async getOptions() {
    
    const res = await axios.get('https://finnhub.io/api/v1/covid19/us', 
    
    {
        params : {
            token : 'bsj288frh5rc8orbqhh0'
        }
    }
    
    ); 
    const data = res.data;


    
    const options = data.map(d => ({
      "label" : d.state,
      "case" : d.case,
      "death" : d.death,
      "date" : d.updated
    }))
  
    this.setState({selectOptions : options});
  }

  
  componentDidMount(){
    this.getOptions(); 
  }

  
  handleChange(e){
    this.setState({name : e.label, cases : e.case, deaths : e.death}); 
  }
  

  

  
  render(){
    return (
      <div>
        <Select options = {this.state.selectOptions} onChange = {this.handleChange.bind(this)} value = "" placeholder = "Select State..."/>
        <div class = "statesGrid">

        
        <div class = "ui vertically divided grid">
            <div class = "three column row">
                <div class = "column">
                    <div class = "stateName">
                        {this.state.name}
                     </div>
                </div>

                <div class = "column">
                    <div class="ui statistic">
                        <div class="value">
                        <NumberFormat value={this.state.cases} displayType={'text'} thousandSeparator={true} />
                            </div>
                        <div class="label">
                            Cases
                        </div>
                    </div>
                </div>

                <div class = "column">
                    <div class="ui statistic">
                        <div class="value">
                        <NumberFormat value={this.state.deaths} displayType={'text'} thousandSeparator={true} />
                            </div>
                        <div class="label">
                            Deaths
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
      </div>

    ); 
  }
  

}

export default States;
