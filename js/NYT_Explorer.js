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
        <div className='results'>
           {
              elements.map(
               (element) => <LinkPreview
                 key={element._id}
                 handleOnClick={this.setDetails}
                 web_url={element.web_url}
                 doc={element}
                 hit={amount}
               />
              )
            }
        </div>
          <div className="details">
          <div>{link_details.hints}</div>
            <div >{link_details.title}</div>
            <div>{link_details.pub_date}</div>
            <div>{link_details.author}</div>
            <div> {link_details.word_count}</div>
            <div>{link_details.snippet}</div>
            <div><a href={link_details.url} target="_blank">{link_details.url}</a></div>
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
      author:'Author:' + author,
      word_count:'Word count: '+ word_count,
      snippet:snippet,
      url: url

    }

    this.props.handleOnClick(details)
  }

  componentDidMount(){
    $.ajax({
      url:"http://api.linkpreview.net/?key=123456&q=https://www.google.com",    
      success:this.setData
    })
  }
  render(){
    const details=this.state.result
    return (
      <div className='page'>
      <div className='results-link' onClick={this.setDetails.bind(this)} >
        <span>
          <img style={{width: '150px'}} src={details.image}/>
        </span>
        <span>
          <div className="title">{details.title}</div>
          <div>{details.description}</div>  
        </span>
      </div>
      </div>
    )
  }

}


function search(){

app.refresh()
}

const root = document.getElementById('root');
var app = ReactDOM.render(<App />, root); 