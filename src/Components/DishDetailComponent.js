import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  Col,
} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from 'reactstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({isModalOpen: !this.state.isModalOpen});
  }
  render() {
    const RenderDish = ({dish}) => {
      if (dish != null)
        return (
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)',
            }}>
            <Card>
              <CardImg top src={baseUrl + dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </FadeTransform>
        );
      else return <div></div>;
    };

    const RenderComments = ({comments, postComment, dishId}) => {
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
          <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>
                Submit Comment
              </ModalHeader>
              <ModalBody>
                <CommentForm dishId={dishId} postComment={postComment} />
              </ModalBody>
            </Modal>
            <h4>Comments</h4>
            <Stagger in>
              {comments.map((comment) => {
                const date = new Date(comment.date);
                return (
                  <Fade in>
                    <div key={comment.id}>
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
                  </Fade>
                );
              })}
            </Stagger>
            <Button outline color='secondary' onClick={this.toggleModal}>
              <i className='fa fa-pencil' aria-hidden='true'></i>
              <span className='ml-2'>Submit Comment</span>
            </Button>
          </div>
        );
      } else {
        return <div></div>;
      }
    };
    if (this.props.isLoading) {
      return (
        <div className='container'>
          <div className='row'>
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className='container'>
          <div className='row'>
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.dish != null)
      return (
        <div>
          <div className='container'>
            <div className='row'>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to='/menu'>Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className='col-12'>
                <h3>{this.props.dish.name}</h3>
                <hr />
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-md-5 m-1'>
                <RenderDish dish={this.props.dish} />
              </div>
              <div className='col-12 col-md-5 m-1'>
                <RenderComments
                  comments={this.props.comments}
                  postComment={this.props.postComment}
                  dishId={this.props.dish.id}
                />
              </div>
            </div>
          </div>
        </div>
      );
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({isModalOpen: !this.state.isModalOpen});
  }

  handleSubmit(values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    // event.preventDefault();
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;

    return (
      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
        <Row className='form-group'>
          <Label htmlFor='rating' md={3}>
            Rating
          </Label>
          <Col md={10}>
            <Control.select
              model='.rating'
              id='rating'
              name='rating'
              className='form-control'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Control.select>
          </Col>
        </Row>
        <Row className='form-group'>
          <Label htmlFor='yourname' md={3}>
            Your Name
          </Label>
          <Col md={10}>
            <Control.text
              model='.author'
              id='author'
              name='author'
              placeholder='Your Name'
              className='form-control'
              validators={{
                required,
                minLength: minLength(3),
                maxLength: maxLength(15),
              }}
            />
            <Errors
              className='text-danger'
              model='.author'
              show='touched'
              messages={{
                required: 'Required',
                minLength: 'Must be greater than 2 characters',
                maxLength: 'Must be 15 characters or less',
              }}
            />
          </Col>
        </Row>
        <Row className='row-group'>
          <Label htmlFor='comment' md={3}>
            Comment
          </Label>
          <Col md={10}>
            <Control.textarea
              model='.comment'
              className='form-control outline-none'
              rows='8'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color='primary' type='submit' className='mt-2'>
              Submit
            </Button>
          </Col>
        </Row>
      </LocalForm>
    );
  }
}

export default DishDetail;
