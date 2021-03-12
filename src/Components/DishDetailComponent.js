import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';

class DishDetail extends Component {
  renderDish(dish) {
    if (dish != null)
      return (
        <div className='col-12 col-md-5 m-1'>
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    else return <div></div>;
  }

  renderComments(comments) {
    if (comments != null) {
      const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ];
      return (
        <div className='col-12 col-md-5 m-1'>
          <h4>Comments</h4>
          {comments.map((comment) => {
            const date = new Date(comment.date);
            return (
              <div>
                <p>{comment.comment}</p>
                <p>
                  -- {comment.author},
                  <span className='ml-2'>
                    {`${
                      month[date.getUTCMonth()]
                    } ${date.getUTCDate()}, ${date.getUTCFullYear()}`}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          {this.renderDish(this.props.dish)}
          {this.renderComments(this.props.dishComments)}
        </div>
      </div>
    );
  }
}

export default DishDetail;
