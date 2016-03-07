import Entity, { fromJSON } from '../Entity/Entity';
import Suid from 'ws.suid';

@Entity
export class Role {
	constructor(id, name) {
		this.id = new Suid(id);
		this.name = name;
	}
}
Role.GUEST = new Role(1, 'Guest');
Role.USER = new Role(2, 'User');
Role.STORE_USER = new Role(3, 'Store-User');
Role.STORE_MANAGER = new Role(4, 'Store-Manager');
Role.BRAND_USER = new Role(5, 'Brand-User');
Role.BRAND_MANAGER = new Role(6, 'Brand-Manager');
Role.BRAUTSCHLOSS_USER = new Role(7, 'Brautschloss-User');
Role.BRAUTSCHLOSS_MANAGER = new Role(8, 'Brautschloss-Manager');
Role.ADMINISTRATOR = new Role(9, 'Administrator');
export default Role;
