import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component{
	constructor(props) {
		super(props);
		console.log('[Persons.js] Inside Constructor', props);
		this.lastPersonRef = React.createRef();
	}

	componentWillMount() {
		console.log('[Persons.js] Inside componentWillMount()');
	}

	componentDidMount() {
		console.log('[Persons.js] Inside componentDidMount()');
		this.lastPersonRef.current.focus();
	}

	componentWillReceiveProps(nextProps) {
		console.log('[UPDATE Persons.js] Inside componentWillReceiveProps');
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('[UPDATE Persons.js] Inside shouldComponentUpdate');
		return nextProps.persons !== this.props.persons ||
			  nextProps.changed !== this.props.changed ||
			  nextProps.clicked !== this.props.clicked;
		//return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
	}

	componentDidUpdate() {
		console.log('[UPDATE Persons.js] Inside componentDidUpdate');
	}

	render () {
		console.log('[Persons.js] Inside render()');
		return this.props.persons.map((person, index) => {
			return <Person
				  click={() => this.props.clicked(index)}
				  key={person.id}
				  name={person.name}
				  ref={this.lastPersonRef}
				  position={index}
				  age={person.age}
				  changed={(event) => this.props.changed(event, person.id)}/>
			});
		}
	}
export default Persons;
