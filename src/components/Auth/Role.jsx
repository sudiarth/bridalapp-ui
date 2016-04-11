import Entity, { fromJSON } from '../Entity/Entity';
import Suid from 'ws.suid';

@Entity
export class Role {}

Role.GUEST = new Role({id:1, name:'Guest'});
Role.USER = new Role({id:2, name:'User'});
Role.STORE_USER = new Role({id:3, name:'Store-User'});
Role.STORE_MANAGER = new Role({id:4, name:'Store-Manager'});
Role.BRAND_USER = new Role({id:5, name:'Brand-User'});
Role.BRAND_MANAGER = new Role({id:6, name:'Brand-Manager'});
Role.BRAUTSCHLOSS_USER = new Role({id:7, name:'Brautschloss-User'});
Role.BRAUTSCHLOSS_MANAGER = new Role({id:8, name:'Brautschloss-Manager'});
Role.ADMINISTRATOR = new Role({id:9, name:'Administrator'});

Role.BRAUTSCHLOSS_ROLES = [Role.BRAUTSCHLOSS_MANAGER, Role.BRAUTSCHLOSS_USER];
Role.STORE_ROLES = [Role.STORE_MANAGER, Role.STORE_USER];
Role.BRAND_ROLES = [Role.BRAND_MANAGER, Role.BRAND_USER];

export default Role;
