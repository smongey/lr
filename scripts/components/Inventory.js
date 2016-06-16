import React from 'react';
import AddFishForm from './AddFishForm';

/* Inventory */
var Inventory = React.createClass({
	renderInventory: function(key) {
		var linkState = this.props.linkState;
		// var details = this.props.details;
		// var isAvailable = (details.status === 'available' ? true : false);
		return (
			<div key={key} className="fish-edit">
				<input type="text" valueLink={linkState('fishes.' + key + '.name')}/>
				<input type="text" valueLink={linkState('fishes.' + key + '.price')}/>
				<select ref="status"  valueLink={linkState('fishes.' + key + '.status')}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" ref="desc" valueLink={linkState('fishes.' + key + '.desc')}></textarea>
				<input type="text" ref="image" valueLink={linkState('fishes.' + key + '.image')}/>	
				<button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
			</div>
		)
	},
	render: function(){
		var name = "Hello There";
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm {...this.props} />
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	},
	propTypes: {
		fishes: React.PropTypes.object.isRequired,
		loadSamples: React.PropTypes.func.isRequired,
		removeFish: React.PropTypes.func.isRequired,
		linkState: React.PropTypes.func.isRequired,
		addFish: React.PropTypes.func.isRequired
	}
});


export default Inventory;