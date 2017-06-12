import React, { Component } from 'react';
import './Test.css';
import {score} from 'fuzzaldrin';
const Fuse = require("fuse.js");
import {FormControl, Button} from 'react-bootstrap';
import UrlSearch from './UrlSearch';


class WebScraper extends Component {
	constructor() {
		super();
		this.state = {
			posting_url: "",
			response_styling: "",
			response: [],
			match_object: [],
			url_search: true,
			fields_to_add: false,
			inbound_mappings: false
		}
		this.handleUpdatePostingUrl = this.handleUpdatePostingUrl.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFuzzFilter = this.handleFuzzFilter.bind(this);
	}
	handleUpdatePostingUrl(event) {
		this.setState({ posting_url: event.target.value });
	}
	handleSubmit(data){
		var request = new Request('http://localhost:8080/', {
			method: 'POST',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ get_url: this.state.posting_url})
		});
		fetch(request)
		.then((response) => {
			response.text().then(text => {
				var array_of_fields = text.split(',');
				this.setState({ response: array_of_fields })
				console.log(array_of_fields);
				console.log(typeof array_of_fields);
				this.handleFuzzFilter();
			})
		});
	}
	handleFuzzFilter(){
		var candidates = ['first_name', 'last_name', 'email', 'company.name', 'postal_code', 'account', 'account_type', 'pass', 'phone_1', 'phone_2', 'tos', 'browser', 'location', 'type', 'gender', 'address_1', 'address_2']
		var original_state_array = this.state.response
		var phone_count = []
		var address_count = []

		var initial_match_array = original_state_array.map(function(item) {
			console.log('phone count: ' + phone_count.length)
			item = item.toLowerCase()
			if ((item === "fname") || (item === "firstname") || ( item === 'first.name') || (item === 'first-name') || (item === 'first_name')) {
				return item = 'first_name'
			}
			if ((item === 'lname') || (item === 'lastname') || (item === 'last.name') || (item === 'last-name')) {
				return item = 'last_name'
			}
			if ((item === 'email') || (item === 'emailaddress') || (item === 'email.address') || (item === 'email_address')) {
				return item = 'email'
			}
			if ((item === 'zip') || (item === 'zipcode') || (item === 'zip_code') || (item === 'zip.code') || (item === 'zip-code') || (item === 'postcode') || (item === 'postalcode') || (item === 'postal.code')) {
				return item = 'postal_code'
			}
			if (/(zip|zipcode|postalcode|postcode)/.test(item)) {
    			return item = 'postal_code'
    		}
    		if (/(phone)/.test(item)) {
    			if (phone_count.length < 1) {
    				phone_count.push('phone_1')
    				return item = 'phone_1'
    			} else if (phone_count.length < 2) {
    				phone_count.push('phone_2')
    				return item = 'phone_2'
    			} else if (phone_count.length <3) {
    				return item = 'phone_3'
    			}
    			return item = undefined
    			
    		}
    		if (/(gender)/.test(item)) {
    			return item = 'gender'

    		}

			if ((item === 'apt') || (item === 'apartment') || (item === 'apt.') || (item === 'ste') || (item === 'suite') || (item === 'ste.') && address_count.length > 1) {
				address_count.push('address_2')
				return item = 'address_2'
			} 
    		
    		if (/(address)/.test(item)) {
    			if (address_count.length < 1) {
    				address_count.push('address_1')
    				return item = 'address_1'
    			} else if (address_count.length < 2 ) {
    				address_count.push('address_2')
    				return item = 'address_2'
    			} 
    			return item = undefined
    			
    		}

    		// can't currently collect trustedform with GET req
    		if (/(xxTrustedFormCertUrl)/.test(item)) {
    			return item = 'trustedform_cert_url'
    		}

    		if (/(age)/.test(item)) {
    			return item = 'age'
    		}

    		return item = undefined
			
		});
		console.log('initial match array: ' + initial_match_array);

		// var results = initial_match_array.map(function(item) {
		// 	var candidates = ['first_name', 'last_name', 'email', 'company.name', 'postal_code', 'account', 'account_type', 'pass', 'phone_1', 'phone_2', 'tos', 'browser', 'location', 'type']
		// 	var fuzzed = score(candidates, item);
		// 	console.log(fuzzed)
		// 	return fuzzed[0];
		// });
		// console.log('fuzz matches:');
		// console.log(results);

		var fuse_results = initial_match_array.map(function(item, index) {
			if (item === undefined) {
				console.log('undefined!')
				var fuse_candidates = [{"field_name": "company_main_phone"},{"field_name": "first_name"}, {"field_name": "last_name"}, {"field_name": "email"}, {"field_name": "company.name"}, {"field_name": "postal_code"}, {"field_name": "account"}, {"field_name": "account_type"}, {"field_name": "pass"}, {"field_name": "phone_1"}, {"field_name": "phone_2"}, {"field_name": "tos"}, {"field_name": "browser"}, {"field_name": "location"}, {"field_name": "type"}, {"field_name": "montly_salary"}, {"field_name": "annual_salary"}]
				var options = {
					shouldSort: true,
		  			threshold: 0.5,
		  			location: 0,
		  			distance: 100,
		  			maxPatternLength: 32,
		  			minMatchCharLength: 1,
		  			keys: [
		  				"field_name"
		  			]
				};
				var fuse = new Fuse(fuse_candidates, options)
				console.log('before search: ')
				console.log(original_state_array[index])
				var fuse_search = fuse.search(original_state_array[index])
				console.log('trying to set fuzz field name')
				// item = fuse_search[0].field_name
				if (fuse_search.length > 1) {
					item = fuse_search[0].field_name
				} else {
					item = 'custom_field'
				}
				console.log(item);

			}
			return item
				
		})
		console.log('fuse results' + fuse_results);

		var response = this.state.response.length
		var match_result = {}
		for (var i = 0; i < response; i++) {
		    match_result[this.state.response[i]] = fuse_results[i];
		}
		this.setState({match_object: match_result})
		console.log(this.state.match_object)
		this.setState({url_search: false, fields_to_add: true})



	// 	console.log('fuse match too:');
	// 	console.log(match_result);

	}
	/*handleFuzzFilter(){
		var candidates = ['first_name', 'last_name', 'email', 'company.name', 'postal_code', 'account', 'account_type', 'pass', 'phone_1', 'phone_2', 'tos', 'browser', 'location', 'type']
		var options = {
			shouldSort: true,
		  	threshold: 0.6,
		  	location: 0,
		  	distance: 100,
		  	maxPatternLength: 32,
		  	minMatchCharLength: 1
		}
		var fuse = new Fuse(candidates, options)
		var results = this.state.response.map(function(item) {
			var fuzzed = fuse.search(item);
			return fuzzed[0];
		});
		console.log(results);
	}*/
	backToSearchUrl() {
		this.setState({url_search: true, fields_to_add: false, inbound_mappings: false})
	}
	forwardToInboundMappings() {
		this.setState({fields_to_add: false, inbound_mappings: true, url_search: false})
	}
	backToFields() {
		this.setState({fields_to_add: true, inbound_mappings: false, url_searach: false})
	}
	render() {
		return(
			
				<div className="field-finder-content-body">
					{ this.state.fields_to_add
						? <div>
							<div className="field-mapping-toggle">
								<Button className="field-mapping-button" bsStyle="primary" onClick={this.forwardToInboundMappings.bind(this)}>Show Mappings</Button>
						  		<h5 className="startover" onClick={this.backToSearchUrl.bind(this)}>Start Over</h5>
						  	</div>
						  	<h1>Add These Fields</h1>
						  </div>

						  
						: ''
					}
					{ this.state.inbound_mappings
						? <div>
							<div className="field-mapping-toggle">
								<Button className="field-mapping-button" bsStyle="primary" onClick={this.backToFields.bind(this)}>Show Fields</Button>
								<h5 className="startover" onClick={this.backToSearchUrl.bind(this)}>Start Over</h5>
							</div>
							<h1>Add These Inbound Mappings</h1>
							<h6>What are <a href="https://support.activeprospect.com/hc/en-us/articles/209564466-LeadConduit-Inbound-Field-Mapping" target="_blank">inbound field mappings</a>?</h6>
						  	<br/>
						  </div>
						: ''
					}
					{ this.state.url_search 
						?   <div className="outer">
								<UrlSearch onClick={this.handleSubmit.bind(this)} onChange={this.handleUpdatePostingUrl.bind(this)} posting_url={this.state.posting_url} />
							</div>
						: <div></div>
					}
					
					
						 
							{/* <ul className="fields_ul">
 								{this.state.response.map(function(item, index){
   									return <li className="fields" key={index}>{item}</li>
 								})}
							</ul>
					
						<div>
						  { this.state.response.length > 0 ? 
						  	<Button bsStyle="primary center-block" bsSize="large" onClick={this.handleFuzzFilter}>Click to find matches in LC</Button> : <p></p>
						  }
						</div>*/}
						
						
							
								{Object.entries(this.state.match_object).map(([key, value]) => {
									if ( this.state.fields_to_add === true ) {
										return 	<div className="fields-div" key={key}>
										   			<div className="leadconduit-standard-field"><span className="leadconduit-standard-color">{value}</span></div>
										   		</div>
										}
									if  ( this.state.inbound_mappings === true && (value !== key) ) {
										return  <div className="fields-div" key={key}>
											<div className="set">Set</div>
								   			<div className="leadconduit-field">{value}</div>
								   			<div className="input-field"><span className="source-field">{key}</span></div>
								   		</div>
									}
								})}
							
					
				</div>
			
		);
	}
}

export default WebScraper;