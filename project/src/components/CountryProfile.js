import React from 'react'; 

class CountryProfile extends React.Component{

    constructor(props){
        super(props); 

        this.state = { 
            name : this.props.name, 
            cases : this.props.cases,
            deaths : this.props.deaths
        }
        console.log(this.state.name);
        console.log(this.state.cases);
        
    }

    render(){
        return (
            <div>
                <div>{this.state.name}</div>
                <div>{this.state.cases}</div>
                <div>{this.state.deaths}</div>
            </div>
        );
    }


}

export default CountryProfile;