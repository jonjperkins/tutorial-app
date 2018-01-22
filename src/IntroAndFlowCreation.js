import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconButton from './IconButton';
import ReactTooltip from 'react-tooltip';

class IntroAndFlowCreation extends Component {
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
							<div className="forward-arrow">
								<p data-tip="Sources"><IconButton class_name="arrow" to="/sources" name="angle-right" /></p>
								<ReactTooltip place="bottom" type="dark" effect="float"/>
							</div>
						</div>
					</div>
					<h1 className="title">Intro and Flow Creation</h1>
					<br />
					<p>Welcome to the LeadConduit Getting Started Guide. This guide will walk you through the core concepts 
					necessary to begin receiving, enhancing, filtering and delivering leads in real time. Completeing the 
					guide will give you all the tools necessary to start building flows and processing leads.</p>
					<br />
					<h2> What is LeadConduit? </h2>
					<p> The LeadConduit platform is a real-time data integration hub used to build sophisticated lead flows 
						to meet the unique needs of your business. Lead flows allow you to capture, enhance, filter and deliver 
						leads to any combination of systems according to custom logic you define. You can imagine a flow looking 
						something like this:</p>
					<img className="img-background" src={require('../images/flowdiagram.png')} alt="Flow Diagram" />
	 				<p>In LeadConduit, a lead’s life-cycle begins at capture and ends with delivery to the system of your 
	 				choice - but only if that lead is qualified.</p>
	 				<p><strong>Capture:</strong> Whether it’s from an internal form or a 3rd party lead vendor, LeadConduit captures leads 
	 				automatically from all your lead sources for centralized processing.</p>			
					<p><strong>Enhance:</strong> Once you have captured a lead, you can use LeadConduit to get additional information on your leads using 
					any 3rd party data service. Verify, score, or append additional information to your leads with best of breed providers.</p>
					<p><strong>Filter:</strong> Use the enhanced data to block or route leads using rules-based logic. LeadConduit provides a real-time response 
					to the lead source informing them if the lead was rejected, along with a reason why.</p>
					<p><strong>Deliver:</strong> Integrate leads into your CRM, ESP, Marketing Automation, or custom system. Leads can be routed to multiple 
					systems or parties based on your requirements.</p>
					<p><strong>Report:</strong> Gain insights into your marketing funnel and statistics. Share with partners for easy reconciliation.</p>
	 				<br />
	 				<h2> Create Your Flow </h2>
	 				<p>LeadConduit can do a lot, and the first step towards harnessing its power is <a href="https://support.activeprospect.com/hc/en-us/articles/115002511123-Logging-In-Launching-Products" target="_blank">signing-in</a>. 
	 				Once you sign-in, launch the LeadConduit app and select the <strong>Flows</strong> button from the navigation bar.</p>
					<img className="img-background" src={require('../images/flow_button.png')} alt="Flow Button" />
					<p>Select the <strong>New Flow</strong> button and you will be taken to flow editor page where you can name your flow. Press the <strong>Save</strong> button when you are done. </p>
					<p data-tip="Click to restart"><img onClick={this.resetGif.bind(this)} className="gif-background" src={this.state.gifShowing ? require('../images/createandnameflow.gif') : require('../images/createandnameflowfalse.gif')} alt="Create Name and Flow" /></p>
					<ReactTooltip place="bottom" type="dark" effect="float"/>
					<p>You just created a flow - <em>great job!</em></p>
					<p>Whenever you make changes to your LeadConduit flow, you must save those changes to prevent losing them when you navigate away from 
					the flow you are working on. You can save your flow by clicking the <strong>Save</strong> button in the upper right-hand corner of the screen. If the Save button 
					is not clickable, there have not been any changes made to your flow since your last save.</p>
					<Link className="next-button" style={{ textDecoration: 'none' }} to="/sources">Next</Link>
				</div>
			</div>
		);
	}
}

export default IntroAndFlowCreation;
