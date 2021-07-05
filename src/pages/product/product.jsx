import React, {Component} from 'react';
import  {Route,Switch,Redirect} from 'react-router-dom'
import AddUpdate from "./add-update";
import Detail from "./detail";
import ProductHome from "./home";
class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route  path='/product' component={ProductHome} exact></Route>
                    <Route  path='/product/detail' component={Detail}></Route>
                    <Route  path='/product/addUpdate' component={AddUpdate}></Route>
                    <Redirect to='/product'></Redirect>
                </Switch>
            </div>
        );
    }
}

export default Product;