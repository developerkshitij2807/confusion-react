# Confusion
Frontend project developed in the coursera course Front-End Web Development with React from The Hong Kong University of Science and Technology(under the guidance of Proffessor Jogesh K Muppala). This project has been developed for educational purposes only. 


## Project Installation
To view or check this project, clone the repository and run npm install in the folder directory. After installation run npm start in the main directory to run the project. 

## Notes

### What is react ? 
React is an frontend javascript framework used to develop mordern user interface applications. 
### How is rendering done in react ? 
Rendering in react can be done via both Class and functional components. 

React follows a declrative approach in which Application(big units) is derived from Components(smaller units) in order to develop the business architechture. 

React is designed in such a manner that the application is fast, simple and scalable. 

React has one way data flow

Whenever we are dealing with lists(arrays) in react we must specify the ID to the root of the rendering element because React renders and updates the component, therefore it is extremely crucial that we specify a unique id in order to deal with list so that if there is any updates to be done React can identify from its unique key ID.

### What are state in react ? 
Local storage in a component of application is known as state.

### What are props in react ?
React props are the data passed from parent to children.


### React Component Lifecycle 
React component consists of three stages 
    => Mounting
    => Updating 
    => Unmounting

    Mounting: - This gets called at the instance of the component,i.e. when it is created

        => contsructor
        => getDerivedFromProps
        => render
        => componentDidMount

    Updating: - This gets called when the component is updated 

        => getDerivedStateFromProps
        => shouldComponentUpdate
        => render
        => getSnapshotBeforeUpdate
        => componentDidUpdate 


