import log from 'picolog';
import Suid from 'ws.suid';

export function Entity(target) {
	return register(target.name, target);
}
export default Entity;

export function	fromJSON(json) {
	if (typeof json == 'string') {
		const result = JSON.parse(json, revive);
		log.info('fromJSON => ', result);
		return result;
	}
	log.log('fromJSON', json, this);
	if (this) {
		const result = Object.create(this.prototype);
		const keys = Object.keys(json);
		log.log('fromJSON: keys=', keys);
		for (let i=0,key; key=keys[i]; i++) {
			result[key] = json[key];
		}
		log.log('fromJSON => ', result);
		return result;
	}
	return fromJSON(JSON.stringify(json));
	/*
	if (Array.isArray(json)) {
		const result = [];
		for (let i=0; i<json.length; i++) {
			result[i] = fromJSON(json[i]);
		}
		return result;
	}
	if (json && typeof json == 'object') {
		const result = {};
		const keys = Object.keys(json);
		log.log('fromJSON: object, keys=', keys);
		for (var key in json) {
			result[key] = fromJSON(json[key]);
		}
		return revive('', result);
	}
	if (typeof json == 'function') {
		return json;
	}
	return revive('', json);
	*/
}

export function toJSON(entity) {
	if (!entity || typeof entity=='string') entity = this;
	const result = { ...entity };
	Object.defineProperty(result, 'toJSON', {value:entity.toJSON});
	return result;
}

export function revive(key, value) {
	log.info('revive', key, value);
	const t = value && typeof value == 'object' && typeof value.type == 'string' && value.type;
	const type = t && registry[t];
	const result = type ? type.fromJSON(value) : Suid.revive((k) => idKey(k))(key, value);
	log.info('revive => ', result);
	return result;
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

export function clone(entity) {
	if (! entity) {entity = this;}
	const result = Object.create(entity.prototype);
	const keys = Object.keys(entity);
	for (let i=0,key; key=keys[i]; i++) {
		const val = entity[key];
		result[key] = val && val.clone ? val.clone() : val;
	}
}

export function register(name, type) {
	function enhance(entity) {
		entity.type = name;
		Object.defineProperty(entity, 'id', {enumerable:true,
			get:function(){return this.__id;},
			set:function(id) {Object.defineProperty(this, '__id', {value:id});},
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
	wrapped.toString = type.toString.bind(wrapped);
	registry[name] = wrapped;
	if (! wrapped.prototype.toJSON) {Object.defineProperty(wrapped.prototype, 'toJSON', {value:toJSON, enumerable:false});}
	if (! wrapped.prototype.equals) {Object.defineProperty(wrapped.prototype, 'equals', {value:equals});}
	if (! wrapped.prototype.clone) {Object.defineProperty(wrapped.prototype, 'clone', {value:clone});}
	if (! wrapped.fromJSON) {Object.defineProperty(wrapped, 'fromJSON', {value:fromJSON});}
	return wrapped;
}

const registry = {};

function idKey(key) {
	return key === 'id' || key.substring && key.substring(key.length - 2) === 'Id';
}
