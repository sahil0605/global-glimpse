import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

//api - 20mc1035- a88c4bdb219b483dbfde37c3c29f8a81 
                //  api -2 => 98108d48f073402a8ee5e2a70d88cb87

export default class News extends Component {
   apiKey="98108d48f073402a8ee5e2a70d88cb87"
  static defaultProps={
    country:'us',
    pageSize:6,
    category:'general',
    }
    static propTypes={
      country:PropTypes.string,
      category:PropTypes.string,
      pageSize:PropTypes.number,
    }
 Capitalize=(string)=>{
     return string.charAt(0).toUpperCase()+string.slice(1)
  }
 
  constructor(props){
    super(props);
    console.log("hello am constructor");
    this.state = {
      articles: [],
      loading: true,
      pages:1,
      totalResults:0,
      
    };
    document.title=`${this.Capitalize(this.props.category)}-Globe Glimpse`
  }
  
//  async update (){
//     const url =
//     `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=98108d48f073402a8ee5e2a70d88cb87&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     this.setState({loading:true});
//   let data=await fetch(url);
//   let parsedData=await data.json()

//  // console.log(parsedData);
//   this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults,loading:false})
//    }

  async componentDidMount() {
   this.props.setProgress(0);
   let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=98108d48f073402a8ee5e2a70d88cb87&page=${this.state.pages}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
    let data=await fetch(url);
    this.props.setProgress(40);
    let parsedData=await data.json()
    this.props.setProgress(70);
  
   // console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults,loading:false})
   // console.log(this.state.articles)
    this.props.setProgress(100)
   // console.log("thi results" + this.state.totalResults)
    
   }

//   handlePrevClick= async()=>{
//     console.log("previous")
//     let url =
//    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a88c4bdb219b483dbfde37c3c29f8a81&page=${this.state.pages -1}&pageSize=${this.props.pageSize}`;
//    this.setState({loading:true});
//    let data=await fetch(url);
//   let parsedData=await data.json()
//   // console.log(parsedData);
//   this.setState({
//     pages: this.state.pages -1,
//     articles: parsedData.articles,
//     loading:false,
//   })
//  // console.log(this.state.articles)
// //  this.setState( {pages:this.state.pages -1})
 
// //  this.update()
//   }  

  // handleNextClick= async()=>{
  // //  if(!(this.state.pages+1 > Math.ceil(this.state.totalResults/this.props.pageSize ))){
  //  console.log("this is implement")
  

  //   let url =
  //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a88c4bdb219b483dbfde37c3c29f8a81&page=${this.state.pages +1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url);
  //   let parsedData=await data.json()
  //   // console.log(parsedData);
  //   this.setState({
  //     pages: this.state.pages +1,
  //     articles: parsedData.articles,
  //     loading:false,
  //   });
  //   //  console.log(this.state.articles)
      
  // }
  // this.setState( {pages:this.state.pages +1})
  // console.log(this.pages)
  // this.update()
 

  //for scrolling
  fetchMoreData=async()=>{
    this.setState({pages:this.state.pages+1})
    console.log(this.state.pages);
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=98108d48f073402a8ee5e2a70d88cb87&page=${this.state.pages+1}&pageSize=${this.props.pageSize}`;
    
  let data=await fetch(url);
  let parsedData=await data.json()

 // console.log(parsedData); 
  this.setState({articles:this.state.articles.concat(parsedData.articles), 
                 totalResults:parsedData.totalResults,
                 })
                //  console.log(this.state.pages +" i am running")
 
  }
  


  render() {
    return (
      <>
        <h1 className="mb-4 text-center" style={{marginTop:"80px"}}><strong>Globe-Glimpse -Top {this.Capitalize(this.props.category)} Headlines </strong>
        </h1>
        <div className="text-center mb-3">{this.state.loading && <Spinner/>}</div>
       
        <InfiniteScroll  
                         dataLength={this.state.articles.length} 
                         next={this.fetchMoreData}
                         hasMore={this.state.articles.length !==this.state.totalResults}
                         loader={<Spinner/>}>
                          {/* console.log(this.pages) */}
        <div className="container my-4">

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={
                    !element.urlToImage
                    ? "https://img.etimg.com/thumb/msid-98534172,width-1070,height-580,imgsize-73406,overlay-etmarkets/photo.jpg"
                    : element.urlToImage
                  }
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                  />
              </div>
            );
          })}
          </div>
        </div>
          </InfiniteScroll>     
      
      </>
    );
  }
}
