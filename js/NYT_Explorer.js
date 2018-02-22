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
    console.log(year+'/'+ month)
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
               (element) => <ShowUrl
                   key={element._id}
                   web_url={element.web_url}
                   />
           )
       }
    </div>
    return urls;
  }
}

function search(){
  app.refresh()
}

const root = document.getElementById('root');
var app = ReactDOM.render(<App />, root);
