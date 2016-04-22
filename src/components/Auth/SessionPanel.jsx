import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, number, string, object, func, array, shape, any } = PropTypes;
import { Link } from 'react-router';
import { Navigation, Button, Icon } from 'react-mdl';

export class SessionPanel extends Component {
	static propTypes = {
		onProvoke: func.isRequired,
		onLogout: func.isRequired,
		session: shape({
			user: shape({
				id: any.isRequired,
				name: string.isRequired,
			})
		}).isRequired,
	}

	render() {
		log.debug('render', this.props);
		const { onProvoke, onLogout, session:{user}, children } = this.props;
		const profile = user ? `/profile/${user.name}` : '';
		return (
			<h4>
				{user
					? <Button className="Logout" colored onClick={onLogout}>Logout</Button>
					: <Button className="Login" colored raised onClick={onProvoke}>Login</Button>
				}
				<Navigation className="Session">
					{user
						? <Link className="Profile" onClick={e => e.preventDefault()} to={profile}><Icon name="account_circle" /> <span title={user.name}>{user.name}</span></Link>
						: <b>Not logged in</b>
					}
				</Navigation>
			</h4>
		)
	}
}
export default SessionPanel;
