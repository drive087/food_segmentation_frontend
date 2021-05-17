import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      responseImgae: null,
      image_original: null,
      image_response: null
    };
    // var responseImage 

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  _handleImageChange(e) {
            console.log('haha')
            e.preventDefault();
        
            let reader = new FileReader();
            let file = e.target.files[0];
        
            reader.onloadend = () => {
            
            this.setState({image_original:reader.result})
            this.setState({image_response:null})

            }
            reader.readAsDataURL(file)
      
            this.handleUploadImage(e)
        }
        

  handleUploadImage(ev) {
    ev.preventDefault();
    const data = new FormData();
    this.setState({image_original:this.uploadInput.files[0]})
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({image_original:reader.result})

    }
    reader.readAsDataURL(this.uploadInput.files[0])

    data.append('file', this.uploadInput.files[0]);
    // data.append('filename', this.fileName.value);
    var response_image;

    fetch('https://piclab.ai/foodclassification2020/classify', {
          method: 'POST',
          body: data,
        })
        // .then(response => console.log(response.json()))
        .then(response => response.blob())
        .then(
          img => {
            console.log(img)
            // this.setState({image:img})
            response_image = URL.createObjectURL(img)
            console.log(response_image)

            this.setState({image_response:response_image})
          }
        )
   
    
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" onChange={(e)=>this._handleImageChange(e)}/>
        </div>
       
        <br />
        {/* <div>
          <button>Upload</button>
        </div> */}
        
        <img src={this.state.image_original} width="512" height="512"/>
        <img src={this.state.image_response} width="512" height="512"/>
      </form>
    );
  }
}

export default Main;