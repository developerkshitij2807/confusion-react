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


### React virtual DOM
=> A lightweight representation of browser DOM
=> In memory, like the tree data structure of plain JS objects
=> Manuplates extremely fast compared to scratch on every setState

Updating the DOM 
    => Diffing algorithm will detect those nodes which are changed
    => Updates entire subtree iff, diffing detects two elements that are stable 
    => Using key, you can hint child elements as stable 
    => No re-rendering will occur as the keys will not change


### React router
=> Collection of navigational components
=> Router components are route matching components and navigational components
=> Uses a browser-based book markable URLs as an instruction to navigate to a client generated view in your app
    => Can also pass along optional parameters

### Web App Routing 
Route matching components path enables specification of current location's path name. 
<Route> component prop specifies view for location 
=> Using exact attribute means that the path must be exactly matched 
=> Redirect enables exact route specification 
=> Switch enables grouping togeather several routes, iterates over its children



### React redux
=> Predictable state container for JS Applications
=> Inspired by flux, elm, and immutable data objects
=> Makes state mutations predictable

=> There is a single source of truth 
    - Single state object
    - state is read-only
    - changes are made with pure functions
    - takes previous state and actions and returns the next state

=> Single store and single state tree enables powerful techniques
    - Logging 
    - API Handling 
    - Undo/redo
    - state/persistence
    - "time travelling debugging"

#### Properties 
=> State: plain JS object 
=> Action: plaint JS Object with a type field that specifies how to change something in state
    - payloads of information sends data from your application to the store
    - plain JS object that must have:
        => a type property, that indicates the type of action to be performed
        => Rest of the object contains the data neccessary for the action 
    - Action Creators
        => encapsulate the process of creating action object
        => returns the object
        => results action object can be passed to store through dispatch
    - Action & Reducers 
        => does not mutate the state
        => actions typically handled through a switch statement 
        => switching on the action type
        => return the previous state in default case
=> Reducer: pure functions that the current state and the action have
=> Store: 
        - Holds the current state value
        - created using createStore()
        - supplies 3 methods 
            => dispatch(): states state update with the provided object
            => getState(): returns the current stored state value
            => subscribe(): accepts a callback function, that will be run everytime action is dispatched
=> Middleware:
        - Forms the pipeline the wraps around the dispatch
        - Pass actions onward
        - Provides the capability to run code after an action is dispatched, but before it reaches the middleware
        - third party extension point 
        - ex. dogging, API calls
        - Restart the dispatch pipeline 
        - Acess the store state

=> Thunk: 
    - Can be used to delay the dispatch of an action, or 
        => Dispatch only if a certain condition is met
        => Inner function receives the dispatch and getState() store methods

