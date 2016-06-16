import React from 'react';
import Catalyst from 'react-catalyst';
import Rebase from 're-base';
var base = Rebase.createClass('https://smcotd.firebaseio.com/');

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

/* App */
var App = React.createClass({
	mixins : [Catalyst.LinkedStateMixin],
	getInitialState: function() {
		return {
			fishes : {},
			order : {}
		}
	},
	componentDidMount: function() {
		base.syncState(this.props.params.storeId + '/fishes', {
			context : this,
			state : 'fishes'
		});

		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);
		if (localStorageRef) {
			this.setState({
				order : JSON.parse(localStorageRef)
			});
		}
	},
	componentWillUpdate: function(nextProps, nextState) {
		localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
	},
	addFish: function(fish) {
		var timestamp = (new Date()).getTime();
		// update state object
		this.state.fishes['fish-' + timestamp] = fish;
		
		// set state object
		this.setState({ fishes : this.state.fishes });
	},
	removeFish: function(key) {
		if(confirm("remove?")) {
			this.state.fishes[key] = null;
			this.setState({
				fishes: this.state.fishes
			});
		}
	},
	addToOrder: function(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({ order : this.state.order });
	},
	removeFromOrder: function(key) {
		delete this.state.order[key];
		this.setState({
			order: this.state.order
		});
	},
	loadSamples: function() {
		this.setState({
			fishes : require('../sample-fishes')
		});
	},
	renderFish: function(key) {
		return <Fish addToOrder={this.addToOrder} key={key} index={key} details={this.state.fishes[key]} />
	},
	render: function(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline={this.props.params.storeId}/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order} />
				<Inventory linkState={this.linkState} fishes={this.state.fishes} removeFish={this.removeFish} addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		)
	}
});


export default App;