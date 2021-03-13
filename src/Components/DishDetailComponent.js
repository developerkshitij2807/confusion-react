import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
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

class DishDetail extends Component {
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
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    // event.preventDefault();
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;

    const RenderDish = ({dish}) => {
      if (dish != null)
        return (
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        );
      else return <div></div>;
    };

    const RenderComments = ({comments}) => {
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
            <h4>Comments</h4>
            {comments.map((comment) => {
              const date = new Date(comment.date);
              return (
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
              );
            })}
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
    const feedbackModal = (
      <Modal
        isOpen={this.state.isModalOpen}
        toggle={this.toggleModal}
        onSubmit={(values) => this.handleSubmit(values)}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
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
                  model='.yourname'
                  id='yourname'
                  name='yourname'
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
                  model='.yourname'
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
        </ModalBody>
      </Modal>
    );

    return (
      <div>
        {feedbackModal}
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
              <RenderComments comments={this.props.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
