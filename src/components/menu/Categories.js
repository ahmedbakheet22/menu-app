import React, { Component } from 'react';
import Items from './Items';
import { Card,Button,Modal,Input  } from 'semantic-ui-react'
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,

} from 'react-accessible-accordion';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      catName:'',
      open: false,
      open2: false,
      open3: false,

      itemId:'',
      Name:'',
      itemPrice:'',
      itemDescription:'',
      newItemId:'',
      newItemName:'',
      newItemPrice:'',
      newItemDescription:'',
      
      index:'',
      item:'',
      object:{}
  }

  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }
  closeConfigShow2 = (closeOnEscape2, closeOnDimmerClick2) => () => {

    this.setState({ closeOnEscape2, closeOnDimmerClick2, open2: true })
  }
  closeConfigShow3 = (closeOnEscape3, closeOnDimmerClick3) => () => {
    this.setState({ closeOnEscape3, closeOnDimmerClick3, open3: true })
  }
  close = () => this.setState({ open: false })
  close2 = () => this.setState({ open2: false })
  close3 = () => this.setState({ open3: false })




  render() {
    const { open, closeOnEscape, closeOnDimmerClick,open2, closeOnEscape2, closeOnDimmerClick2,open3, closeOnEscape3, closeOnDimmerClick3  } = this.state
    
    this.updateComp = this.updateComp.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.closeConfigShow3 = this.closeConfigShow3.bind(this);

    
    return (
            <div className=''>
            <div className="ui divider"></div>
            {this.props.loginUserData.role===0 &&<div className='catBtn'>
            <Button basic color='green' onClick={this.closeConfigShow(false, true)}>
              Edit
            </Button>
            <Button basic color='red' onClick={e=>{this.deleteCategory(this.props.oneCategorie)}}>
              Delete
            </Button>
            </div>}

            <Accordion className="">
                    <AccordionItem >
                        <AccordionItemTitle >
                            <h3 >{this.props.oneCategorie.name}</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                  <div className="ui grid">
                    <div className="row">
                    {this.props.loginUserData.role===0 &&   <Button  onClick={this.closeConfigShow2(false, true)} basic color='green'     > 
                    <i className="food icon"></i>
                    Add New Item 
                    </Button>}
                    </div>
                  </div>
                        <Card.Group>

                        {Object.values(this.props.oneCategorie.items).map((item)=>{
                            return <Items oneItem={item} categoryId={this.props.oneCategorie.id} loginUserData={this.props.loginUserData} updateComp={this.updateComp} handleEditItem={this.handleEditItem}/>

                        })}
                  </Card.Group>
                </AccordionItemBody>                    
              </AccordionItem>
            </Accordion>
  

{/* edit category Modal */}
    <Modal size="small"
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Rename Category</Modal.Header>
          <Modal.Content>
            <p><strong>Enter new name</strong></p>
            <div className="ui grid">

           
            <div className="ui row">   

            <div className="ten wide column">
            <Input   onChange={e=>{this.setState({catName:e.target.value})}} fluid  placeholder='Enter Item Name...'  />
            </div>
            </div>
            
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Close
            </Button>
            <Button
              onClick={e=>{this.editCategory(this.props.oneCategorie);this.setState({open:false})}}
              
              positive
              labelPosition='right'
              icon='checkmark'
              content='Add'
            />
          </Modal.Actions>
        </Modal>



        {/* add Item Modal */}

        <Modal size="small"
          open={open2}
          closeOnEscape={closeOnEscape2}
          closeOnDimmerClick={closeOnDimmerClick2}
          onClose={this.close2}
        >
          <Modal.Header>Add Item to this Category</Modal.Header>
          <Modal.Content>
            <div className="ui grid">

           
            <div className="ui row">   
            <div className="three wide column">Item ID</div>

            <div className="three wide column">
            <Input   onChange={e=>{this.setState({itemId:e.target.value})}} fluid  placeholder='Id...' type='number' />
            </div>
            <div className="three wide column">Item Name</div>
            <div className="six wide column">
            <Input   onChange={e=>{this.setState({itemName:e.target.value})}} fluid  placeholder='Name...'  />
            </div>
            </div>
            <div className="ui row">   
            <div className="three wide column">Item price</div>

            <div className="three wide column">
            <Input   onChange={e=>{this.setState({itemPrice:e.target.value})}} fluid  placeholder='price...' type='number' />
            </div>
            <div className="three wide column">Item Description</div>
            <div className="six wide column">
            <Input   onChange={e=>{this.setState({itemDescription:e.target.value})}} fluid  placeholder='Description...'  />
            </div>
            </div>
            
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close2} negative>
              Close
            </Button>
            <Button
              onClick={e=>{this.addItem(this.props.oneCategorie);this.setState({open2:false})}}
              
              positive
              labelPosition='right'
              icon='checkmark'
              content='Add Item'
            />
          </Modal.Actions>
        </Modal>
    


        {/* edit Item Modal */}

        <Modal size="small"
          open={open3}
          closeOnEscape={closeOnEscape3}
          closeOnDimmerClick={closeOnDimmerClick3}
          onClose={this.close3}
        >
          <Modal.Header>Edit Item</Modal.Header>
          <Modal.Content>
            <div className="ui grid">

           
            <div className="ui row">   
            <div className="three wide column">Item ID</div>

            <div className="three wide column">
            <Input   onChange={e=>{this.setState({newItemId:e.target.value})}} fluid  placeholder='new Id...' type='number' />
            </div>
            <div className="three wide column">Item Name</div>
            <div className="six wide column">
            <Input   onChange={e=>{this.setState({newItemName:e.target.value})}} fluid  placeholder='new Name...'  />
            </div>
            </div>
            <div className="ui row">   
            <div className="three wide column">Item price</div>

            <div className="three wide column">
            <Input   onChange={e=>{this.setState({newItemPrice:e.target.value})}} fluid  placeholder='new price...' type='number' />
            </div>
            <div className="three wide column">Item Description</div>
            <div className="six wide column">
            <Input   onChange={e=>{this.setState({newItemDescription:e.target.value})}} fluid  placeholder='new Description...'  />
            </div>
            </div>
            
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeConfigShow3} negative>
              Close
            </Button>
            <Button
              onClick={e=>{this.editItem(this.state.index,this.state.item,this.state.object);this.setState({open3:false})}}
              
              positive
              labelPosition='right'
              icon='checkmark'
              content='Edit Item'
            />
          </Modal.Actions>
        </Modal>
    

    </div>
    
    );
  }

componentDidMount(){
}

  /*Methods*/
editCategory(obj){
  let index=this.getTheObjToOperate(obj.id)
  let newObj=this.getObjFromLocalStorage('categories').categories;
  newObj[index].name=this.state.catName;
  newObj={"categories":newObj}
  this.storeObjectsToLocalStorage('categories',newObj)
  this.props.updateComp()
}


deleteCategory(obj){
  let index=this.getTheObjToOperate(obj.id)
  let newObj=this.getObjFromLocalStorage('categories').categories;
  newObj.splice(index,1);
  newObj={"categories":newObj}
  this.storeObjectsToLocalStorage('categories',newObj)
  this.props.updateComp()
}

addItem(obj){
    let willStoreObj=  {
    "id": parseFloat(this.state.itemId),
    "name": this.state.itemName,
    "price":parseFloat(this.state.itemPrice),
    "description":this.state.itemDescription
     };
    let index=this.getTheObjToOperate(obj.id)
    let newObj=this.getObjFromLocalStorage('categories').categories;
    newObj[index].items.push(willStoreObj);
    newObj={"categories":newObj}
    console.log(newObj)
    this.storeObjectsToLocalStorage('categories',newObj)
    this.props.updateComp()
}

    getTheObjToOperate(id){
    let obj=this.getObjFromLocalStorage('categories');
    let index=-1
    obj.categories.forEach((el,i) => {
      if(el.id===id){
        index= i;
      }
    });
    return index
    }

      getObjFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key))
      }
      storeObjectsToLocalStorage(key,val){
      localStorage.setItem(key,JSON.stringify(val))
      }

      updateComp(){
        this.props.updateComp();
      }

      handleEditItem(index,item,object){
      // console.log(index,item,obj)
      this.state.open3=true;
      this.setState({index:index,item:item,object:object})
      }

      editItem(index,item,object){
        let newIndex=index 
        let newItem=item  
        let obj=object;  
        let newObj=this.getObjFromLocalStorage('categories');
        obj[newItem].id=this.state.newItemId;
        obj[newItem].name=this.state.newItemName;
        obj[newItem].description=this.state.newItemDescription;
        obj[newItem].price=this.state.newItemPrice;
        newObj.categories[newIndex].items=obj;
        this.storeObjectsToLocalStorage('categories',newObj)
        this.props.updateComp()
      }
}

export default Categories;
