class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      details: {
        title: '',
        description: '',
        web_url: ''
      }
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
  }

  setDetails(details) {
    this.setState({details});
  }

  refresh(){
    var year=document.getElementById('year').value
    var month=document.getElementById('month').value
    console.log('Results from:'+year+'/'+ month)
    $.ajax({
       url: "https://api.nytimes.com/svc/archive/v1/"+year+"/"+month+".json",
       method:'GET',
       data:{'api-key':"067228c511f04592964fcc8bd15ae934"},
       success: this.setData
    })
  }

 render() {      
   const elements = this.state.data;
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
            <div>{this.state.details.title}</div>
            <div>{this.state.details.description}</div>
            <div>{this.state.details.web_url}</div>
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
    const {title, description, web_url} = this.state.result;

    const details = {
      title: title,
      description: description,
      web_url: web_url
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
      <div className='results-link' onClick={this.setDetails.bind(this)}>
        <span>
         <a href={this.props.web_url} target='_blank'> <img style={{width: '150px'}} src={details.image}/></a>
        </span>
        <span>
         <div style={{display: 'inline-block'}}><a href={this.props.web_url} target='_blank'>{details.title}</a></div>
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