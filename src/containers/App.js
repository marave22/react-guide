import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/_Aux';
import withClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends Component {
	constructor(props) {
		super(props);
		console.log('[App.js] Inside Constructor', props);
		this.state = {
			persons: [
				{ id: 'sdfsdf', name: 'Max', age: 28 },
				{ id: 'adfaf', name: 'Manu', age: 29 },
				{ id: 'afdgb', name: 'Stephanie', age: 26 }
			],
			otherState: 'some other value',
			showPersons: false,
			toggleClicked: 0,
			authenticated: false
		};
	}

	componentWillMount() {
		console.log('[App.js] Inside componentWillMount()');
	}

	componentDidMount() {
		console.log('[App.js] Inside componentDidMount()');
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('[UPDATE App.js] Inside shouldComponentUpdate');
		return nextState.persons !== this.state.persons ||
			  nextState.showPersons !== this.state.showPersons;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE App.js] Inside componentWillUpdate',
			  nextProps,
			  nextState
		);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log(
			"[UPDATE App.js] Inside getDerivedStateFromProps",
			  nextProps,
			  prevState
		);
		return prevState;
	}

	getSnapshotBeforeUpdate() {
		console.log(
			  "[UPDATE App.js] Inside getSnapshotBeforeUpdate"
		);
	}

	componentDidUpdate() {
		console.log('[UPDATE App.js] Inside componentDidUpdate');
	}

	nameChangedHandler = (event, id) => {
  	const personIndex = this.state.persons.findIndex(p => {
  		return p.id === id;
	});

  	const person = {
  		...this.state.persons[personIndex]
  	};

  //	const person = Object.assign({}, this.state.persons[personIndex]);

	  person.name = event.target.value;

	  const persons = [...this.state.persons];
	  persons[personIndex] = person;

	  this.setState({persons: persons} );
  };

  deletePersonsHandler = (personIndex) => {
  	//const persons =  this.state.persons.slice();
	const persons = [...this.state.persons];
  	persons.splice(personIndex, 1);
  	this.setState({persons: persons})
  };

  togglePersonsHandler = () => {
  	const doesShow = this.state.showPersons;
  	this.setState((prevState, props)=> {
  		return {
			showPersons: !doesShow,
			toggleClicked: prevState.toggleClicked + 1
		}
  	});
  };

  loginHandler = () => {
  	this.setState({authenticated: true})
  };

  render() {
  	console.log('[App.js] Inside render()');
  	let persons = null;

  	if ( this.state.showPersons ) {
  		persons = <Persons
			  persons={this.state.persons}
			  clicked={this.deletePersonsHandler}
			  changed={this.nameChangedHandler}/>;
    	}

    	return (
    		  <Aux>
				  <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
				  <Cockpit
						 login={this.loginHandler}
						 appTitle={this.props.title}
						 showPersons={this.state.showPersons}
						 persons={this.state.persons}
						 clicked={this.togglePersonsHandler}/>
				  <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
			  </Aux>
		);
   }
}

export default withClass(App, classes.App);
