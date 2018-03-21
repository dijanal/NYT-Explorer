import React from 'react';
import $ from 'jquery';

import './NYT_Explorer.css';




class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      details: {},
      hits:[]
    }
    this.setData = this.setData.bind(this);
    this.setDetails = this.setDetails.bind(this);
    this.refresh=this.refresh.bind(this);
  }
  
  setData(theDataToSet){
    let data=[]
    for(var i=0;i<20;i++){
      const doc=theDataToSet.response.docs[i]
      data.push(doc)
    }
    const hits=theDataToSet.response.meta.hits
    console.log("Number of articles for choosen date: "+theDataToSet.response.meta.hits)
    this.setState({'data': data,hits:hits}); 
  }

  setDetails(details) {
    this.setState({details});
  }

  refresh(){

    //set selectors

    var date=document.getElementById('date1').value
    var date1=date.split('-')
    var year=date1[0]
    var month=date1[1]
    var month1=month.split('')
    var month2=month1[1]
    console.log('Results from:' + year + '/' + month2)

    $.ajax({
      url: "https://api.nytimes.com/svc/archive/v1/"+year+"/"+month2+".json",
       method:'GET',
       data:{'api-key':"067228c511f04592964fcc8bd15ae934"},
       success: this.setData
    })
  }



 render() {  
   const elements = this.state.data;
   const link_details=this.state.details
   const amount=this.state.hits
   console.log(elements)
    return (
      <div>
        <section id='section1'>
    <div>
      <h1 id="top">NYT Explorer</h1>
      <p>NYT Explorer is single page web app that enables you to explore NY Times archive of articles. </p>
    </div>
  </section>
  <section id='section2'>
    <div>
      <p>Choose date:  <input type='month' id='date1' /> 
      <button type='submit' className='btn btn-primary' onClick={this.refresh} id='button'>Search
      </button>     
      </p>
    </div>
    <div id='amount'/>
  </section>
  <hr/>
        <div className='results'>
           {
              elements.map(
               (element) => <LinkPreview
                 key={element._id}
                 handleOnClick={this.setDetails}
                 web_url={element.web_url}
                 doc={element}
                 hit={amount}
                 details={link_details}
               />
              )
            }
        <div className='button'>
          <a  href="#top" id='backToTop'><button> &#9650;</button></a>
        </div>
        </div>
        <div className="details">
          <div>{link_details.hints}</div>
          <div >{link_details.title}</div>
          <div>{link_details.pub_date}</div>
          <div> {link_details.word_count}</div>
          <div>{link_details.author}</div>
          <div>{link_details.snippet}</div>
          <div><a href={link_details.url} target="_blank" id='link'>{link_details.url}</a></div>
        </div>
      </div>
    );
  }
}


class LinkPreview extends React.Component{

  constructor(props){
    super(props)
    this.state={
      result:[]
    }
    this.setData=this.setData.bind(this)
    this.setDetails=this.setDetails.bind(this)
  }

  setData(result){
    this.setState({result: result})
  }

  setDetails(){
    const hit1=this.props.hit
    const {title, url} = this.state.result;
    const word_count = this.props.doc.word_count;
    const pub_date=this.props.doc.pub_date;
    pub_date.split('T')
    let pub_date1=pub_date.slice(0,10)
    const author=this.props.doc.byline.original
    const snippet=this.props.doc.snippet
    const details = {
      hints:'Number of all articles: '+ hit1,
      title:'Title: '+ title,
      pub_date:'Date: '+ pub_date1,
      word_count:'Word count: '+ word_count,
      author: author,
      snippet:snippet,
      url: url

    }

    this.props.handleOnClick(details)
  }


  componentDidMount(){
    $.ajax({
      url:"https://api.linkpreview.net/?key=5a8c6323b4866f01b8bf3c88dab0d56d3b36c16fa90dd&q="+this.props.web_url,
      success:this.setData
    })
  }
  render(){
    const details=this.state.result
    const details2=this.props.details
    return (
      <div className='page'>
      <div className='results-link' onClick={this.setDetails.bind(this)} >
        <span>
          <img style={{width: '150px'}} src={details.image} alt='NYT.jpg'/>
        </span>
        <span>
          <div className="title">{details.title}</div>
          <div>{details.description}</div> 
        </span> 
        </div>
        <div className='details2'>
          <div>{details2.author}</div>
          <div>{details2.word_count}</div>
          <div><a href={this.props.web_url} target='blank'>{details2.url}</a></div>
        </div>
      </div>
    )
  }

}




export default App