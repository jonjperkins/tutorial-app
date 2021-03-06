import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconButton from './IconButton';
import ReactTooltip from 'react-tooltip';

class NonWizardEnhancements extends Component {
	constructor() {
		super();
		this.state = {
			gifShowing: true
		}
	}
	resetGif() {
		this.setState({gifShowing: !this.state.gifShowing})
		console.log(this.state.gifShowing);
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return(
			<div className="ancestor">
				<div className="chapter-content-body">
					<div className="arrow-wrapper">
						<div className="inner-arrow-wrapper">
							<div className="back-arrow">
								<p data-tip="Submission Docs"><IconButton class_name="arrow" to="/submission-docs" name="angle-left" /></p>
								<ReactTooltip place="bottom" type="dark" effect="float"/>
							</div>
							<div className="forward-arrow">
								<p data-tip="Filters"><IconButton class_name="arrow" to="/non-wizard-filters-and-rules" name="angle-right" /></p>
								<ReactTooltip place="bottom" type="dark" effect="float"/>
							</div>
						</div>
					</div>
					<h1 className="title">Enhancements</h1>
					<br/>
					<p>Adding enhancement steps to your lead flow allows you to append additional data or validate the data provided
					with each lead.</p>
					<p>Here are a just a few examples of enrichment data you can add to your leads in LeadConduit:</p>
					<ul>
						<li>Mortgage Information</li>
						<li>Average Credit Scores for a ZIP+4 Area</li>
						<li>Employee or Business Information</li>
						<li>Consumer & Household Information</li>
					</ul>
					<p>Here are a few examples of information you can verify using one of our marketplace integrations:</p>
					<ul>
						<li>Phone numbers</li>
						<li>Email addresses</li>
						<li>Mailing addresses</li>
					</ul>
					<p>In this guide, you’ll encounter examples of setting up enhancements to verify phone and email data. 
					To see a full list of available enhancement services, you can visit this page:   
					<a href="http://docs.leadconduit.com/" target="_blank"> http://docs.leadconduit.com/</a>.</p>
					<br />
					<h2>Add Phone Validation</h2>
					<p> Switch over to the <strong>Steps</strong> tab in your flow and select the option to add an enhancement. This will 
					bring up a menu of options to choose from. Scroll down and select the <strong>Telesign</strong> option.</p>
					<p data-tip="Click to restart"><img onClick={this.resetGif.bind(this)} className="gif-background" src={this.state.gifShowing ? require('../images/telesignUpdate.gif') : require('../images/telesignUpdate2.gif')} alt="Telesign" /></p>
					<ReactTooltip place="bottom" type="dark" effect="float"/>
					<p>Pricing information is highlighted in green for each enhancement.
					Once this enhancement is in your flow, it will automatically send leads with phone numbers to Telesign for validation and append any 
					relevant data.</p>
					<br />
					<h2>Add Email Validation</h2>
					<p>Now it’s your turn to implement a step. In this section of the guide, you’ll implement the the email 
					verification step with Webbula.</p>
					<p>Whenever you’re using an enhancement integration for the first time, it’s best to visit our <a href="https://support.activeprospect.com/hc/en-us" target="_blank">Knowledge 
					Base</a> for an explanation of how that integration works. Enhancements behave differently from each other, 
					so it’s important to understand what kind of responses each will return so that you can filter correctly.</p>
					<p>To implement the <strong>Webbula CloudHygiene - Email Hygiene</strong> step, first take a look through our Knowledge Base 
					article <a href="https://support.activeprospect.com/hc/en-us/articles/204981955-Webbula-Email-Hygiene-Verification" target="_blank">here </a> 
					to get familiar with what kind of information Webbula will send back to us.  When you’re ready, 
					you can go ahead and add the Webbula step. If you get stuck, check out the video clip below for help.</p>
					<p data-tip="Click to restart"><img onClick={this.resetGif.bind(this)} className="gif-background" src={this.state.gifShowing ? require('../images/addwebbulaUpdate.gif') : require('../images/addwebbulaUpdate2.gif')} alt="Webbula" /></p>
					<ReactTooltip place="bottom" type="dark" effect="float"/>
					<div className="arrow-wrapper">
						<div className="inner-arrow-wrapper">
							<div className="back-arrow">
								<p data-tip="Submission Docs"><IconButton class_name="arrow" to="/submission-docs" name="angle-left" /></p>
								<ReactTooltip place="bottom" type="dark" effect="float"/>
							</div>
							<div className="forward-arrow">
								<p data-tip="Filters"><IconButton class_name="arrow" to="/non-wizard-filters-and-rules" name="angle-right" /></p>
								<ReactTooltip place="bottom" type="dark" effect="float"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NonWizardEnhancements;