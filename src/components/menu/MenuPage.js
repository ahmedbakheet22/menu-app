import React, { Component } from 'react';
import Categories from './Categories';
import { Button,Modal,Input  } from 'semantic-ui-react'

class Menu extends Component {
  constructor() {
    super();
    this.state = {
        categories:{},
        newCategories:{},
        open: false,
        catId:'',
        catName:''
  }
  }

  /*Modal handling functions */
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }
  close = () => this.setState({ open: false })


  render() {
  /*binding this to fix the scope issues */
    this.logOut = this.logOut.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.updateComp = this.updateComp.bind(this);
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    
    return (
      <div className="menu">
            <div onClick={this.logOut} className='ui  teal submit button'>Log Out</div>
            {/* loop on the component */}
            {this.props.categories.categories.map((cat)=>{
                return <Categories oneCategorie={cat} loginUserData={this.props.loginUserData } updateComp={this.updateComp}/> 
            })}
            
            <div className="ui divider"></div>
            {/* this section for admins only */}
            {this.props.loginUserData.role===0 &&
            <Button  onClick={this.closeConfigShow(false, true)} basic color='green' fluid    > 
              <i className="clone outline icon"></i>
                  Add New Category 
            </Button>}
        

          <Modal size="small"
              open={open}
              closeOnEscape={closeOnEscape}
              closeOnDimmerClick={closeOnDimmerClick}
              onClose={this.close}
            >
              <Modal.Header>Add New Category</Modal.Header>
              <Modal.Content>
                <p><strong>It's time for Category details</strong></p>
                <div className="ui grid">

                <div className="ui row">
                <div className="two wide  column">ID</div>   
                <div className="six wide column">
                <Input   onChange={e=>{this.setState({catId:e.target.value})}} fluid  placeholder='Enter Category Id...' type='number'  />
                
                </div>
                </div>
                <div className="ui row">   
                <div className="two wide column">Category Name</div>   

                <div className="ten wide column">
                <Input   onChange={e=>{this.setState({catName:e.target.value})}} fluid  placeholder='Enter category Name...'  />
                </div>
                </div>
                
                </div>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.close} negative>
                  Close
                </Button>
                <Button
                  onClick={this.addCategory}
                  positive
                  labelPosition='right'
                  icon='checkmark'
                  content='Add Category'
                />
              </Modal.Actions>
            </Modal>

             </div>
    );
  }
  /*Life Cycle Methods*/
componentDidMount(){
 console.log('menu page',this.props.categories.categories)
}
  /*Methods*/
 addCategory(){
    this.setState({ open: false });
    this.prepareNewObj();
   }
  
   logOut(){
    this.props.triggerParentUpdate();

  }

  prepareNewObj(){
    let newObj=  {
      "id": parseInt(this.state.catId),
      "name": this.state.catName,
      "items":[]
       };
       let oldObj=this.getCategoriesFromLocalStorage('categories').categories;
       oldObj.push(newObj);
       this.setState({newCategories:{"categories":oldObj}},()=>{
       this.storeObjectsToLocalStorage('categories',this.state.newCategories)
       this.props.updateState();

       })
         

      }

      getCategoriesFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key))
      }
      storeObjectsToLocalStorage(key,val){
      localStorage.setItem(key,JSON.stringify(val))
      }

      updateComp(){
      this.props.updateState();
    }
  }

export default Menu;
