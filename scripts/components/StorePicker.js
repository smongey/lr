import React from 'react';
import { History } from 'react-router';
import h from '../helpers';


/* Store Picker */
var StorePicker = React.createClass({
	mixins : [History],
	goToStore: function(event) {
		event.preventDefault();
		// get data from input
		var storeId = this.refs.storeId.value;
		var slugged = h.slugify(this.refs.storeId.value)
		// transition from StorePicker to App
		this.history.pushState(storeId, '/store/' + slugged);
	},
	render: function(){
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()} required />
				<input type="submit"/>
			</form>
		)
	}
});


export default StorePicker;