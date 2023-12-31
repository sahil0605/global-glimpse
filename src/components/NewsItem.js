import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} =this.props;
    return (
      <div className='my-2'>
        <div className="card" style={{width: "18rem"}}>
   
        <div style={{display:"flex",
  justifyContent:"flex-end",
  position:"absolute",
  right:"0"
  }}>
    <span className="badge rounded-pill bg-danger" style={{left:"90%" ,zIndex:"1"}}>
    {source}
  </span>
  </div>

  <img src= {imageUrl} className="card-img-top my-2" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}
 
    </h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target='_blank' className="btn btn-secondary md-2">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
