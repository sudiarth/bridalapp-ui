import log from 'picolog';
import Suid from '../../suid';

export function Entity(target) {
	return register(target.name, target);
}
export default Entity;

export function	fromJSON(json) {
	if (typeof json == 'string')
		return JSON.parse(json, revive);

	const result = typeof this == 'function' ? new this() : this;
	for (var key in json) {
		if (key !== 'type') {result[key] = json[key];}
	}
	return result;
}

export function toJSON(entity) {
	if (!entity || typeof entity=='string') entity = this;
	return { ...entity, toJSON:entity.toJSON, type:entity.constructor.name };
}

export function revive(key, value) {
	const t = value && typeof value == 'object' && typeof value.type == 'string' && value.type;
	const type = t && registry[t];
	return type ? type.fromJSON(value) : Suid.revive(key, value);
}

export function equals(one, other) {
	if (arguments.length == 1) {
		return one && (
			(one.id instanceof Suid && one.id.equals(this.id)) ||
			(one instanceof Suid && one.equals(this.id)) ||
			(this.id && this.id.value == one)
		)
	}

	if (one === other) return true;
	if (one && !(one instanceof Suid) && typeof one.equals == 'function') return one.equals(other);
	if (other && !(other instanceof Suid) && typeof other.equals == 'function') return other.equals(one);
	if (one instanceof Suid) return one.equals(other);
	if (other instanceof Suid) return other.equals(one);
	return false;
}

export function register(name, type) {
	function enhance(entity) {
		Object.defineProperty(entity, 'id', {enumerable:true,
			get:function(){return entity.__id;},
			set:function(id){Object.defineProperty(this, '__id', {value:new Suid(id)});},
		});
		entity.version = null;
	}
	let wrapped;
	eval(`
		wrapped = function ${name}(){
			enhance(this);
			type.apply(this, arguments);
		};
	`);
	wrapped.prototype = Object.create(type.prototype);
	registry[name] = wrapped;
	if (! wrapped.prototype.toJSON) {Object.defineProperty(wrapped.prototype, 'toJSON', {value:toJSON});}
	if (! wrapped.prototype.equals) {Object.defineProperty(wrapped.prototype, 'equals', {value:equals});}
	if (! wrapped.fromJSON) {Object.defineProperty(wrapped, 'fromJSON', {value:fromJSON});}
	return wrapped;
}

const registry = {};
