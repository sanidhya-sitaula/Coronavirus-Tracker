import React from 'react'; 
import Select from 'react-select'; 
import Axios from 'axios';
import MediaCard from './mediacard'; 
import Grid from '@material-ui/core/Grid'; 
import unsplash from '../api/unsplash';

class News2 extends React.Component{

    state = {
        data : null,
        word : null,
        images : ['green.jpeg', 'blue.jpg', 'yellow.jpg', 'purple.jpg', 'red.jpg']
    }

   getRandomInt(max){
       return require('../img/' + this.state.images[Math.floor(Math.random() * Math.floor(max))]);

   }
   
    async componentDidMount() {

        let url1 = 'https://gnews.io/api/v3/search?q=coronavirus&token=d63f4d779a85e77d1be6cdb830a919e9&max=30';
        

        let url = 'https://newsapi.org/v2/everything?' +
          'q=Coronavirus&' +
          'from=2020-08-02&' +
          'sortBy=popularity&' +
          'apiKey=9fcb36547ea84d1cbd1b1f881d0ce42f'; 

      
        await fetch(url1, {
            params : {
                'max' : 20,
                'country' : 'af',
            }
        }).then(response => response.json()).then(data => this.setState({data}));

        //const response1 = await fetch(url); 
        //await fetch(response1.url).then(response => response.json()).then(data => this.setState({data})); 


    
       

       
     
    }


    renderArticles(){

        if (!this.state.data){
            return <div>Loading...</div>
        }
        
        const articles = this.state.data.articles.map(article => {


            return(
                <div>
                <Grid item xs = {12} sm = {6} md = {11} >

                 {article.image ? <MediaCard variant = "outlined" title = {article.title} content = {article.description.substring(0,100)} link = {article.url} image = {article.image} published = {article.publishedAt} /> 
                 :  <MediaCard variant = "outlined" title = {article.title} content = {article.description.substring(0,100)} link = {article.url} image = {this.getRandomInt(4)} published = {article.publishedAt} />
                 }

                
                
                
                <br />
                <br />
                </Grid>
                </div>
            );

        })

        return articles;

    }

    

    render(){

    return (
    <div>
            <Grid item style = {{display : 'flex'}} container spacing = {4} >

        {this.renderArticles()}
    </Grid>        
        </div>);
    }

}
export default News2; 