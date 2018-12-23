import React, { Component } from 'react';
import '../../App.css';

class Loginform extends Component {

  constructor() {


    super();
    this.state = {
      loginStatus:true,
      loginTrigger:false,
    }
  

  }
  render() {
  this.submitForm = this.submitForm.bind(this);
  this.checkUserData = this.checkUserData.bind(this);

    return (
      <div className="loginForm">
              <div className="ui middle aligned center aligned grid">
                  <div className="column loginContainer">
                    <h2 className="ui teal image header">
                      <div className="content">
                        Welcome to menu app, let's get started
                      </div>
                    </h2>
                    <form className="ui large form" onSubmit={this.submitForm}>
                      <div className="ui stacked segment">
                        <div className="field">
                          <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input type="text" name="email" placeholder="E-mail address" ref ='email'/>
                          </div>
                        </div>
                        <div className="field">
                          <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" ref='password'/>
                          </div>
                        </div>
                        <input className="ui fluid large teal submit button" type='submit' value='Login'/> 

                      </div>
                
                      <div className="ui error message"></div>
                
                    </form>
                
                    {this.state.loginStatus===false && <div className="ui message red"><strong>OOPS</strong>, Looks like your data is invalid. Try again!</div>}
                  </div>
              </div>
        </div>
    );
  }

  /*Methods*/
  submitForm(e){
    e.preventDefault();
    this.checkUserData();
  }
  
  checkUserData(){
let email= this.refs.email.value;
let password =this.refs.password.value;
let usersDatabase=this.retreiveDataFromLocalStorage('users');
usersDatabase.users.forEach((el) =>{
  if(el.login===email && el.password===password) {
    this.storeObjectsToLocalStorage('loginData',el)
    this.storeVariableToLocalStorage('isLogged',true)
    this.props.triggerParentUpdate();
    this.setState({loginTrigger:true})
  }
});
    if(this.state.loginTrigger===false){
      this.setState({loginStatus:false})
    }
    else{
      this.setState({loginStatus:true})

    }
    console.log(this.state.loginStatus)

  }

  retreiveDataFromLocalStorage(key){
    return JSON.parse( localStorage.getItem(key));
  }
  storeObjectsToLocalStorage(key,val){
  localStorage.setItem(key,JSON.stringify(val))
  }
  storeVariableToLocalStorage(key,val){
  localStorage.setItem(key,val)
  }
}

export default Loginform;
