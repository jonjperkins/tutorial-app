import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, FormControl, ControlLabel, Button, Grid} from 'react-bootstrap';
import TestFormResponse from './TestFormResponse';
import './Test.css';
var ReactDOM = require('react-dom');


class TestingTool extends Component {
	constructor() {
		super();
		this.state = {
			posting_url: "",
			response_message: "",
			leadconduit_event_id: "",
			response_styling: "",
			api_key: "",
			field_pairs: {},
			form_submission_body: '',
			step_1: true,
			step_2: false,
			step_3: false,
			posting_url_errors: '',
			errors: ''
		}

		this.handleUpdatePostingUrl = this.handleUpdatePostingUrl.bind(this);
		this.handleUpdateFirstName = this.handleUpdateFirstName.bind(this);
		this.handleUpdateLastName = this.handleUpdateLastName.bind(this);
		this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
		this.handleUpdatePhone = this.handleUpdatePhone.bind(this);
		this.handleUpdateAge = this.handleUpdateAge.bind(this);
		this.handleUpdateSportsTeam = this.handleUpdateSportsTeam.bind(this);
		this.handleUpdateUsername = this.handleUpdateUsername.bind(this); 
		this.handleUpdateAPIKey = this.handleUpdateAPIKey.bind(this);
		this.handleFetchInputFields = this.handleFetchInputFields.bind(this);
	}
	handleFetchInputFields() {
		var request = new Request('http://localhost:8080/test-tool', {
			method: 'POST',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ posting_url: this.state.posting_url, api_key: this.state.api_key })
		});
		fetch(request)
		.then((response) => {
			response.text().then(text => {
				var stringified_fields_object = text.split(',');
				var field_pairs = JSON.parse(stringified_fields_object)
				this.setState({ field_pairs: field_pairs})
				console.log(this.state.field_pairs.response)
				
				if (this.state.field_pairs.response === "none" ) {
					this.setState({ step_1: false, step_2: true, step_3: false, field_pairs: {}, errors: "Please submit a valid API key."  })
				} else {
					this.setState({ step_1: false, step_2: false, step_3: true })
				}
				
			});
		});
	}
	handleUpdatePostingUrl(event) {
		if (/(^https:\/\/app\.leadconduit\.com\/flows\/.*\/sources\/.*\/submit$)/.test(event.target.value)) {
			this.setState({ posting_url: event.target.value });
			this.setState({ posting_url_errors: ''});
		} else {
			this.setState({ posting_url_errors: 'Please copy and paste your posting url exactly as it appears on your posting instructions.'});
		}
	}
	handleUpdateFirstName(event) {
		this.setState({ first_name: event.target.value });
	}
	handleUpdateLastName(event) {
		this.setState({ l_name: event.target.value });
	}
	handleUpdateEmail(event) {
		this.setState({ email: event.target.value });
	}
	handleUpdatePhone(event) {
		this.setState({ phone_1: event.target.value });
	}
	handleUpdateAge(event) {
		this.setState({ age: event.target.value });
	}
	handleUpdateSportsTeam(event) {
		this.setState({ sports_team: event.target.value });
	}
	handleUpdateUsername(event) {
		this.setState({ username: event.target.value });
	}
	handleUpdateAPIKey(event) {
		this.setState({ api_key: event.target.value });
	}
	goToStep2() {
		this.setState({ step_1: false, step_2: true, step_3: false })
	}
	createFormSubmissionBody() {
		var dynamic_fields = ReactDOM.findDOMNode(this.form)
		console.log(dynamic_fields.value);
		console.log(dynamic_fields.length);
		var form_submission_body = {}
		for (var i = 0; i < dynamic_fields.length; i++) {
			var name = dynamic_fields[i].name;
			var value = dynamic_fields[i].value;
			console.log("name: " + name + " , " + "value: " + value);
			if (value === undefined) {
				form_submission_body[name] = ''
			}
			else {
			form_submission_body[name] = value
			}	
			console.log(form_submission_body)
		}
		var request = new Request(this.state.posting_url, {
			method: 'POST', 
			headers: new Headers({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}),
			body: JSON.stringify(form_submission_body)
		});
		fetch(request)
		.then((response) => {
			if (response.ok) {
				response.json().then(json => {
					if (json.outcome.toString() === "failure") {
						this.setState({ response_message: json.reason, response_styling: "bad_lead", leadconduit_event_id: json.lead.id })
					}
					else {
						this.setState({ response_message: json.outcome, response_styling: "good_lead", leadconduit_event_id: json.lead.id })
					}
				})
			}
			else {
				this.setState({response_message: "Oops. Something went wrong. Please make sure you\'re pasting your LeadConduit flow's Posting Url in its entirety.", response_styling: "bad_lead"})
			}
		});
		window.scrollTo(0, 0)
		}
	render() {
		return(
			<div className="chapter-content-body">
				{this.state.step_1 && 
					<div className="transition">
					<div className="outer-test-tool margin-booster">
						<div className="inner-test-tool form-background">
							<h4> The LeadConduit testing tool requires you to enter a few pieces of information before 
							you begin testing your flow. If you navigate away from or refresh this page, you'll need to 
							re-enter this information. Click <strong>Next</strong> to get started.</h4>
							<br />
							<Button bsStyle="primary" bsSize="large" onClick={this.goToStep2.bind(this)}>Next</Button>
						</div>	
					</div>
					</div>
				}	
				{this.state.step_2 &&
					<div className="transition">
					<div className="outer-test-tool margin-booster">
						<div className="inner-test-tool form-background">
						<Form>
							<FormGroup>
								<h3><strong>Enter the following pieces of information.</strong></h3>
								<br />
								<div>
								<strong>API Key:</strong>
								{this.state.errors.length > 0 &&
									<h6 style={{color: "red"}}>{this.state.errors}</h6>
								}
								<FormControl name="api_key" className="input extra-margins" type="text" required onChange={this.handleUpdateAPIKey}></FormControl>
								<h6 className="smaller-h6"><em>You can find your API key by clicking the <strong>Account Settings</strong> button in the top right corner of your <a href="https://sso.activeprospect.com/account" target="_blank">account page</a>.</em></h6>
								<strong>Posting URL:</strong>
								<FormControl name="postingUrl" className="input extra-margins" type="text" placeholder="The posting URL of the flow you want to test." required onChange={this.handleUpdatePostingUrl}></FormControl>
								{(this.state.posting_url_errors !== '') &&
								<h6 style={{color: "red"}}>{this.state.posting_url_errors}</h6>
								}
								<h6 className="smaller-h6"><em>Find the Posting URL in your <a href="https://support.activeprospect.com/hc/en-us/articles/115002225566-Finding-and-Using-Posting-Instructions" target="_blank">posting instructions</a>.</em></h6>	
								<br />
								<Button bsStyle="primary" style={{ textAlign: "right" }} bsSize="large" disabled={(!this.state.api_key || !this.state.posting_url)} onClick={this.handleFetchInputFields}>Next</Button>
								<br />
								</div>
							</FormGroup>
						</Form>
						</div>	
					</div>
					</div>
				}
				{this.state.step_3 &&

					<div className="transition">
						<div className="outer-results">	
							<TestFormResponse 
								response_message={this.state.response_message} 
								response_styling={this.state.response_styling}	
								leadconduit_event_id={this.state.leadconduit_event_id} />
						</div>
						<div className="outer-test-tool">
							<form className="button-margin" ref={(form) => this.form = form}>
								
									<h1 className="smaller-title">Send a Test Lead</h1>
									<div className="field-response">
									{Object.entries(this.state.field_pairs).map(([key, value]) => {
											
											return 	<FormGroup key={key}>
														<ControlLabel>{key}</ControlLabel>
														<FormControl name={value} className="input"></FormControl>	
													</FormGroup>
															
									})}
									
								</div>
							</form>
							<Button bsStyle="primary center-block button-margin" bsSize="large" onClick={this.createFormSubmissionBody.bind(this)}>Submit</Button>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default TestingTool;