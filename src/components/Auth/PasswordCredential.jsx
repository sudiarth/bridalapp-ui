import Entity from '../Entity/Entity';
import Credential from './Credential';

@Entity
export class PasswordCredential extends Credential {
	constructor(id, password) {
		super(id)
		this.password = password;
	}
}
export default PasswordCredential;