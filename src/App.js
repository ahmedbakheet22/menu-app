import React, { Component } from 'react';
import Loginform from './components/login/Loginform';
import MenuPage from './components/menu/MenuPage';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged : localStorage.getItem('isLogged'),
      categories:{},
      logedUserData:{}
  }
  }
 
  render() {
  this.loginSucceeded = this.loginSucceeded.bind(this);
  this.logOutSucceeded = this.logOutSucceeded.bind(this);
  this.updateState = this.updateState.bind(this);

  
    return (
      <div className="App ui container">
      
      {/* switch between login view and menu view */}
        { this.state.isLogged ==='false' && <Loginform triggerParentUpdate={this.loginSucceeded}/> }
        { this.state.isLogged ==='true'  && <MenuPage loginUserData={this.state.logedUserData} updateState={this.updateState} triggerParentUpdate={this.logOutSucceeded} categories={this.state.categories}/> }

      </div>
    );
  }

  /*Life Cycle Methods*/
  componentWillMount(){
    this.checkLoginStatus();
    this.initMainData();
    this.setState({categories: this.getObjFromLocalStorage('categories')})
    this.setState({logedUserData:JSON.parse(localStorage.getItem('loginData'))})
    }

/*Methods*/

initMainData(){
  /* here defined the initial data for first time USEAGE initial users and initial menu data */
  let initialUsersobject ={
    "users": [
      {
        "id": 1,
        "name": "Ahmed Bakheet",
        "role":0,
        "login":"ahmed.bakheet@elmenus.com",
        "password":"admin01"
      },
      {
        "id": 2,
        "name": "Mohamed Ali",
        "role":0,
        "login":"mohamed.ali@elmenus.com",
        "password":"admin02"
      },
      {
        "id": 3,
        "name": "Hazem Morsi",
        "role":1,
        "login":"Hazem@elmenus.com",
        "password":"user1"
      },
      {
        "id": 4,
        "name": "Monira Fathy",
        "role":1,
        "login":"Monira@elmenus.com",
        "password":"user2"
      }
    ]
  }
  let initialCategoriesobject={
    "categories": [
      {
        "id": 80877,
        "name": "Appetizers",
        "items": [
          {
            "id": 132548,
            "name": "French Fries",
            "description": "Custom premium cut by farm frites. Add melted cheese for 7LE - chili con carne for 9LE",
            "price": 54.834
          },
          {
            "id": 655881,
            "name": "Nacho Chips & Salsa",
            "description": "Homemade crispy nacho chips served with fresh salsa dip",
            "price": 32.21
            
          },
          {
            "id": 655882,
            "name": "Sweet Potato Fries",
            "description": "Served with hot mayo dip",
            "price": 55.12
            
          },
          {
            "id": 655883,
            "name": "Seasoned Wedges",
            "description": "Served with garlic mayo dip",
            "price": 58.999
            
          },
          {
            "id": 132565,
            "name": "Chili Cheese Fries",
            "description": "French fries, topped with chili con carne & melted cheddar cheese, served with sour cream and pickled jalapenos",
            "price": 51.3
            
          },
          {
            "id": 655884,
            "name": "Potato Skins",
            "description": "Loaded with cheese & chili beef ( served with sour cream)",
            "price": 12.22
            
          },
          {
            "id": 132549,
            "name": "Onion Rings",
            "description": "",
            "price": 74.55
            
          }
        ]
      },
      {
        "id": 21281,
        "name": "Salads",
        "items": [
          {
            "id": 655880,
            "name": "BLT Salad",
            "description": "Grilled bacon , lettuce , tomatoes with ranch sauce",
            "price": 34.834
          },
          {
            "id": 132570,
            "name": "Caesar Salad",
            "description": "Lettuce, Parmesan cheese, Croutons & Caesar dressing",
            "price": 12.2
          },
          {
            "id": 132574,
            "name": "Garden Salad",
            "description": "Mixed greens and fresh garden selections tossed in vinaigrette dressing",
            "price": 23.33
          },
          {
            "id": 164438,
            "name": "Rocket Mushroom Salad",
            "description": "Rocket leaves, fresh mushrooms, Parmesan cheese, Balsamic dressing",
            "price": 53.33
          }
        ]
      }
    ]
  }


  if(localStorage.getItem('users')==null){
    this.storeObjectsToLocalStorage('users',initialUsersobject)
  }
  if(localStorage.getItem('categories')==null){
    this.storeObjectsToLocalStorage('categories',initialCategoriesobject)
  }


}

/* check if the user loged in or not to know what view will the user see*/
checkLoginStatus(){
  if(localStorage.getItem('isLogged')==null){
    // console.log('first time to use app')
    this.storeVariableToLocalStorage('isLogged',false)
  }
}

/* store any obj to local storage depending on a key and a value*/
storeObjectsToLocalStorage(key,val){
localStorage.setItem(key,JSON.stringify(val))
}

/* store any variable 'non object' to local storage depending on a key and a value*/
storeVariableToLocalStorage(key,val){
localStorage.setItem(key,val)
}

/* get a key from local storage */
getObjFromLocalStorage(key){
  return JSON.parse(localStorage.getItem(key))
}


loginSucceeded(){
  this.setState({isLogged:'true'})
  this.storeVariableToLocalStorage('isLogged',true);
  this.setState({logedUserData:JSON.parse(localStorage.getItem('loginData'))})

}


/*methods called from child components */
logOutSucceeded(){
  this.setState({isLogged:'false'})
  this.setState({logedUserData:{}})
  this.storeVariableToLocalStorage('isLogged',false);
}

updateState(){
  this.state.categories= this.getObjFromLocalStorage('categories')
  console.log('new state',this.state.categories)
  this.forceUpdate()
}

}

export default App;
