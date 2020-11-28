import React from 'react'; 

class Graph extends React.Component{

    state = {
        loading : true,
        timeline : []
    }

    async componentDidMount(){
        //Get the global stats 
     const url_timeline = 'https://api.thevirustracker.com/free-api?countryTimeline=US';
     const response_timeline = await fetch(url_timeline);
     const data_timeline = await response_timeline.json();
     this.setState({timeline : data_timeline.timelineitems[0]});
     console.log(this.state.timeline);
 
 }

 render(){
     return <div>HAHA</div>
 }


}

export default Graph; 