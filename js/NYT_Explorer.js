function ShowUrl(props){

  return(  

      <div><a href={props.web_url}>{props.web_url}</a></div> 
           
   )
}

class App extends React.Component {

  constructor(props){
    super(props)
    this.state={data:[]}
    this.setData = this.setData.bind(this);
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
   const urls =
    <div>
       {
      elements.map(
       (element) => <LinkPreview
       key={element._id}
       web_url={element.web_url}
       />
      )
    }
    </div>
    return urls;
  }
}


class LinkPreview extends React.Component{

  constructor(props){
    super(props)
    this.state={result:[]}
    this.setData=this.setData.bind(this)

  }

  setData(result){
    this.setState({result: result})
  }

  componentDidMount(){
    $.ajax({
      url:"http://api.linkpreview.net/?key=5a8c6323b4866f01b8bf3c88dab0d56d3b36c16fa90dd&q="+this.props.web_url,
      success:this.setData
    })
  }
  render(){
    const answers=this.state.result
    console.log(answers)

    return (
      <div>
        <span>
          <img style={{width: '150px'}} src={this.state.result.image}/>
        </span>
        <span>
          <div style={{display: 'inline-block'}}><a href={this.props.web_url}>{this.state.result.title}</a></div>
          <div>{this.state.result.description}</div>
        </span>
      </div>
    )
  }

}

function search(){
app.refresh()
}

const root = document.getElementById('root');
var app = ReactDOM.render(<App />, root);
