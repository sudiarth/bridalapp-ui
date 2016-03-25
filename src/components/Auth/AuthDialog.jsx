import log from 'picolog';
import React, { PropTypes, Component } from 'react';
const { string, bool, object, func, array, shape } = PropTypes;
import { Tabs, Tab, Button, DialogTitle, DialogContent, DialogActions } from 'react-mdl';
log.assert(Button && DialogTitle && DialogContent && DialogActions, 'Not all react-mdl components are defined.');
import classNames from 'classnames';

import { Dialog, Textfield } from '../Mdl/mdl-extras';
log.assert(Dialog && Textfield, 'Not all react-mdl-extras components are defined.');

export class AuthDialog extends Component {
	static propTypes = {
		defaultClass: string.isRequired,
		className: string,
		challenged: bool,
		loginDialog: object,
		registerDialog: object,
	}

	static defaultProps = {
		defaultClass: 'AuthDialog',
	}

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

	render() {
		log.debug('render', this.props);
		const { className, defaultClass, challenged, onCancel, onLogin, onRegister, loginDialog, registerDialog, ...props } = this.props;
		const classes = classNames(className, defaultClass);
		return (
			<Dialog modal className={classes} open={challenged} onCancel={onCancel} {...props}>
				<Tabs activeTab={this.state.activeTab}
					onChange={(activeTab) => {this.setState({...this.state, activeTab})}} ripple>
					<Tab>&nbsp; Login &nbsp;</Tab>
					<Tab>Register</Tab>
				</Tabs>
				{ !this.state.activeTab ?
					<DialogContent>
						<p><b>Login</b> or <a href="#" onClick={() => this.setState({...this.state, activeTab:1})}>create an account</a>.</p>
						<form className="LoginForm">
							<Textfield name="username" label="Username" floatingLabel {...loginDialog.username} />
							<Textfield name="password" label="Password" floatingLabel {...loginDialog.password} />
						</form>
					</DialogContent>
				:
					<DialogContent>
						<p><b>Create an account</b> or <a href="#" onClick={() => this.setState({...this.state, activeTab:0})}>Login</a>.</p>
						<form className="RegistrationForm">
							<Textfield name="username" label="Username" floatingLabel {...registerDialog.username} />
							<Textfield name="password" label="Password" floatingLabel {...registerDialog.password} />
							<Textfield name="passwordConfirm" label="Password (confirm)" floatingLabel {...registerDialog.confirm}/>
						</form>
					</DialogContent>
				}
				{ !this.state.activeTab ?
					<DialogActions>
						<Button raised colored onClick={onLogin}> &nbsp; Login &nbsp; </Button>
						<Button onClick={onCancel}>Cancel</Button>
					</DialogActions>
				:
					<DialogActions>
						<Button raised colored onClick={onRegister}>Register</Button>
						<Button onClick={onCancel}>Cancel</Button>
					</DialogActions>
				}
			</Dialog>
		)
	}
}

export default AuthDialog;
