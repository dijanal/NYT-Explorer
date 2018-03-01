class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      details: {}
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
    this.setState({'data': data }); 
    console.log(theDataToSet.response.meta.hits) 
 
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
    console.log('Results from '+ year + '/' + month2)


    //set number of all articles

    var root1=document.getElementById('amount')
    const array1=<p>{this.state.data.title}</p>
    var array='Number of articles:  ' + array1
    root1.innerHTML=array

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
   console.log(elements);
    return (
      <div>
        <div className='results'>
           {
              elements.map(
               (element) => <LinkPreview
                 key={element._id}
                 handleOnClick={this.setDetails}
                 web_url={element.web_url}
               />
              )
            }
        </div>
          <div className="details">
            <div>{link_details.title}</div>
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
    const {title, description, url} = this.state.result;

    const details = {
      title: title,
      description: description,
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
    console.log(details)

    return (
      <div className='page'>
      <div className='results-link' onClick={this.setDetails.bind(this)} >
        <span>
          <img style={{width: '150px'}} src={details.image}/>
        </span>
        <span>
          <div >{details.title}</div>
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