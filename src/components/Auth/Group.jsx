import Entity from '../Entity/Entity';

@Entity
export class Group {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}
export default Group;
