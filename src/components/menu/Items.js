import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'

class Items extends Component {
  constructor() {
    super();
    this.state = {
      itemId:'',
      Name:'',
      itemPrice:'',
      itemDescription:''
  }

  }
  render() {

    return (
    <Card>
      <Card.Content>
        <Card.Header>{this.props.oneItem.name}</Card.Header>
        <Card.Meta>{this.props.oneItem.price} LE</Card.Meta>
        <Card.Description>
        {this.props.oneItem.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          {this.props.loginUserData.role===0 &&  <div className='ui two buttons'>
          <Button basic color='green' onClick={e=>{this.editItem(this.props.categoryId)}}>
            Edit
          </Button>
          <Button basic color='red' onClick={e=>{this.deleteItem(this.props.categoryId)}}>
            Delete
          </Button>
        </div>}

      </Card.Content>
    </Card>
  
    );
  }

  
  
 deleteItem(id){
  let index=this.getTheObjToOperate(id)
  let item=this.getTheItemToOperate(this.props.oneItem,index)
  let obj=this.getObjFromLocalStorage('categories').categories[index].items;
  let newObj=this.getObjFromLocalStorage('categories');
  obj.splice(item,1);
  newObj.categories[index].items=obj;
  console.log(newObj)
  this.storeObjectsToLocalStorage('categories',newObj)
  this.props.updateComp()
}


editItem(id){
  let index=this.getTheObjToOperate(id)
  let item=this.getTheItemToOperate(this.props.oneItem,index)
  let obj=this.getObjFromLocalStorage('categories').categories[index].items;
  this.props.handleEditItem(index,item,obj)
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

  getTheItemToOperate(object,index){
     let obj=this.getObjFromLocalStorage('categories').categories[index].items;
     let itemsIndex=-1


      obj.forEach((el,i) => {
          if(el.id===object.id){
            itemsIndex=i
            }
     });
     return itemsIndex
    }


      getObjFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key))
      }
      storeObjectsToLocalStorage(key,val){
        console.log('I am storing new object')
      localStorage.setItem(key,JSON.stringify(val))
      }

}

export default Items;




