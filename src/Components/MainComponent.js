import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
// import DishDetail from './DishDetailComponent';
import {DISHES} from '../data/dishes';
import DishDetail from './DishDetailComponent';
import {COMMENTS} from '../data/comments';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      selectedComments: null,
      selectedDish: null,
    };
  }

  onDishSelect(dish) {
    this.setState({selectedDish: dish}, () => {
      this.setComments(this.state.selectedDish.id);
    });
  }

  setComments(id) {
    this.setState({
      selectedComments: this.state.comments.filter(
        (comment) => comment.dishId === id
      ),
    });
  }

  render() {
    return (
      <div>
        <Navbar dark color='primary'>
          <div className='container'>
            <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu
          dishes={this.state.dishes}
          onDishSelect={(dish) => this.onDishSelect(dish)}
        />
        <DishDetail
          dish={this.state.selectedDish}
          dishComments={this.state.selectedComments}
        />
      </div>
    );
  }
}

export default Main;
