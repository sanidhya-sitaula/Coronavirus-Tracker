import React from 'react'; 
import './GlobalStats.css';
import CountUp from 'react-countup';
import NumberFormat from 'react-number-format';


class GlobalStats extends React.Component{

    state = {
        loading : true,
        global_stats : []
      }; 
    

    async componentDidMount(){
           //Get the global stats 
        const url_global = 'https://api.thevirustracker.com/free-api?global=stats';
        const response_global = await fetch(url_global);
        const data_global = await response_global.json();
        this.setState({global_stats : data_global['results'][0]});
        console.log(this.state.global_stats);
        var total_number = this.state.global_stats.total_cases; 
    
    }



    render() {
        return (<div className = "global_stats">
          <div class = "ui vertically divided grid">
            <div class = "three column row">
                <div class = "column">
                    <div class = "row">
                        <h2 className = "title">Total Cases</h2>
                    </div>
                    <div class = "row">

            <h1 className = "case_number"><NumberFormat value={this.state.global_stats.total_cases} displayType={'text'} thousandSeparator={true} /></h1>
                    </div>
                </div>
                <div class = "column">
                    <div class = "row">
                        <h2 className = "title">Total Deaths</h2>
                    </div>
                    <div class = "row">
                        <h1 className = "case_number"><NumberFormat value={this.state.global_stats.total_deaths} displayType={'text'} thousandSeparator={true} /></h1>
                    </div>
                </div>

                <div class = "column">
                    <div class = "row">
                        <h2 className = "title">Total Unresolved</h2>
                    </div>
                    <div class = "row">
                        <h1 className = "case_number"><NumberFormat value={this.state.global_stats.total_unresolved} displayType={'text'} thousandSeparator={true} /></h1>

                    </div>
                </div>
            </div>

            <div class = "three column row">
                <div class = "column">
                    <div class = "row">
                            <h2 className = "title">Total Recovered</h2>
                        </div>
                        <div class = "row">
                            <h1 className = "case_number">
                                
                                
                            <NumberFormat value={this.state.global_stats.total_recovered} displayType={'text'} thousandSeparator={true} />
                                </h1>

                        </div>
                </div>

                <div class = "column">
                    <div class = "row">
                        <h2 className = "title">Total New Cases Today</h2>
                    </div>
                        <div class = "row">
                            <h1 className = "case_number"> <NumberFormat value={this.state.global_stats.total_new_cases_today} displayType={'text'} thousandSeparator={true} /></h1>

                        </div>
                </div>

                <div class = "column">
                    <div class = "row">
                        <h2 className = "title">Total New Deaths Today</h2>
                    </div>
                        <div class = "row">
                            <h1 className = "case_number"> <NumberFormat value={this.state.global_stats.total_new_deaths_today} displayType={'text'} thousandSeparator={true} /></h1>

                        </div>
                </div>

            </div>

          </div>
          </div>
          );
         
    }

}

export default GlobalStats;