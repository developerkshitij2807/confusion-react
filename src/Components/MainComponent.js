import React, {Component} from 'react';
import Menu from './MenuComponent';
import {DISHES} from '../data/dishes';
import {COMMENTS} from '../data/comments';
import {PROMOTIONS} from '../data/promotions';
import {LEADERS} from '../data/leaders';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
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
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({match}) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route
            exact
            path='/menu'
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Route
            exact
            path='/aboutus'
            component={() => <About leaders={this.state.leaders} />}
          />
          <Route exact path='/contactus' component={Contact} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
