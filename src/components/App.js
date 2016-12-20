import React from 'React';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';


//设置默认数据
// var RecipeArr = (localStorage['Recipes'] != undefined ? Json.Parse(localStorage['Recipes'] : [
//   {title:'红烧肉',Ingredients:'菜,米,油,盐'},
//   {title:'红烧肉',Ingredients:'菜,米,油,盐'}
// ]);

//配料组件
var Ingredient = React.createClass({
  render: function(){
    return(
      <ListGroupItem>{this.props.data}</ListGroupItem>
    );
  }
});

//菜单组件
var Recipe = React.createClass({
  render: function(){
    var IngredientArr = [];
    this.props.data.Ingredients.split(',').forEach(function(value,index){
      IngredientArr.push(<Ingredient data = {value} key = {index}/>);
    });
    return (
      <Panel header={this.props.data.title} eventKey={this.props.index} bsStyle="success">
        <h4 className="text-center">菜单</h4><hr/>
        <ListGroup >
          {IngredientArr}
        </ListGroup>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick = { this.props.delete } >删除</Button>
          <Button onClick = {this.props.open} >编辑</Button>
        </ButtonToolbar>
      </Panel>
    );
  }
});



var App = React.createClass({
  getInitialState : function(){
    return {
      showModal: false,
      recipes: ( localStorage['recipes'] != undefined ? JSON.parse(localStorage['recipes']): [{title:'红烧肉',Ingredients:'菜,米,油,盐'},{title:'红烧肉2',Ingredients:'菜2,米2,油2,盐2'}])
    }
  },
  close: function(){
    this.setState({
      showModal: false
    });
  },
  open: function(i){
    return function(){
      debugger;
      this.setState({
        showModal: true
      });
      if(i>=0){
        setTimeout(function(){
           document.getElementById('editor').onclick = this.update(i);
           document.getElementById('editor').text = '编辑菜单';
           document.getElementById('recipe').value = this.state.recipes[i].title;
           document.getElementById('ingredient').value = this.state.recipes[i].Ingredients;
        }.bind(this),1000);
      }else{
        setTimeout(function(){
          document.getElementById('editor').onclick = this.update();
        }.bind(this),1000);
      }
    }.bind(this)
  },
  update: function(i){
    return function(){
      debugger;
       var title = document.getElementById('recipe').value,
           ingredient = document.getElementById('ingredient').value;
       if(i>=0){
         //编辑
         if(title.length <=0 ){
           return;
         }
        this.state.recipes[i].title = title;
        this.state.recipes[i].Ingredients = ingredient;
        // this.setState({
        //   recipes: recipes
        // })
       }else{
         //新增
          var recipe = {};
          if(title.length <= 0){
            title = 'Untitled';
          }
          recipe.title = title;
          recipe.Ingredients = ingredient;
          this.state.recipes.push(recipe);
          this.setState({
            recipes: this.state.recipes
          });
       }
       //关闭弹框
       this.close();
       //更新本地数据
      localStorage['recipes'] = JSON.stringify(this.state.recipes);
    }.bind(this);
  },
  delete: function(i){
    return function(){
      //更新状态
      this.state.recipes.splice(i,1)
       this.setState({
         recipes:this.state.recipes
       });
       //更新本地缓存
       localStorage['recipes'] = JSON.stringify(this.state.recipes);
    }.bind(this)
  },
  render: function(){
    var recipeArr = [];
    this.state.recipes.forEach(function(value,index){
      recipeArr.push(<Recipe data = {value} update = {this.update(index)} delete = {this.delete(index)} open = {this.open(index)} key = {index}/>)
    }.bind(this));
    return (
        <div className = 'container'>
          <div className = 'well'>
            <Accordion>
              {recipeArr}
            </Accordion>
          </div>
          <Button  bsStyle="primary" onClick = {this.open()}>添加项目</Button>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>添加食谱</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>食谱</ControlLabel>
                <FormControl
                  type="text"
                  placeholder = '红烧肉'
                  id = 'recipe'
                />
              </FormGroup>
              <FormGroup >
                <ControlLabel>配料</ControlLabel>
                <FormControl componentClass="textarea" placeholder="菜,米,油,盐" id = 'ingredient'/>
              </FormGroup>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle = 'primary'  id = 'editor'>确定</Button>
              <Button onClick = {this.close}>取消</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
});

export default App;
