import log from 'picolog';
import Suid from 'ws.suid';

export function Entity(target) {
	return register(target.name, target);
}
export default Entity;

export function	fromJSON(json) {
	if (typeof json == 'string') {
		const result = JSON.parse(json, revive);
		log.trace('fromJSON => ', result);
		return result;
	}
	log.debug('fromJSON', json, this);
	if (this) {
		const result = Object.create(this.prototype);
		const keys = Object.keys(json);
		log.trace('fromJSON: keys=', keys);
		for (let i=0,key; key=keys[i]; i++) {
			result[key] = json[key];
		}
		log.trace('fromJSON => ', result);
		return result;
	}
	return fromJSON(JSON.stringify(json));
}

export function toJSON(entity) {
	// if toJSON is called with an entity object as argument, it returns the JSON for that entity
	if (typeof entity == 'object') return JSON.stringify(entity);
	// otherwise, it creates a result object with an extra `type` field and `toJSON` method
	const result = { ...this, type:this.constructor.name };
	Object.defineProperty(result, 'toJSON', {value:toJSON});
	return result;
}

export function toError(response) {
	return (response ? response.text() : Promise.resolve('unknown error')).then(text => {
		const error = Error(text);
		error.message = text;
		error.status = response && response.status || 500;
		error.statusText = response && response.statusText || text;
		error.toJSON = toJSON;
		throw error;
	})
}

export function equals(one, other) {
	if (arguments.length === 1) {return equals(this, one);}
	return (
		// comparison of entity with itself
		(one === other) ||
		// comparison of entity with some id
		(one && one.id === other) ||
		(one && hasEquals(one.id) && one.id.equals(other)) ||
		(other && other.id === one) ||
		(other && hasEquals(other.id) && other.id.equals(one)) ||
		// comparison of two entities of same type
		(one && other && one.constructor === other.constructor &&
			(
				(one.id === other.id) ||
				(hasEquals(one.id) && one.id.equals(other.id)) ||
				(hasEquals(other.id) && other.id.equals(one.id))
			)
		)
	)
}

export function indexOf(list, entity) {
	for (let i=0; i<list.length; i++) {
		if (equals(list[i], entity)) {return i;}
	}
	return -1;
}

/**
 * Creates a new object that has all of the properties of `entity`, including it's id.
 * A clone is a different instance of *the same* entity. Any sub-entities will also be
 * cloned, unless you set `shallow` to `true`.
 */
export function clone(entity, shallow=false) {
	if (! entity) {entity = this;}
	const result = Object.create(entity.constructor.prototype);
	const keys = Object.keys(entity);
	for (let i=0,key; key=keys[i]; i++) {
		const val = entity[key];
		result[key] = val && val.clone && !shallow ? val.clone() : val;
	}
	return result;
}

/**
 * Creates a new object that has all of the properties of `entity`, except for it's id.
 * A copy is a new instance of *a new* entity. The copy will not have any id set, allowing
 * (requiring) you to set it yourself. By default, sub-entities will not be copied, unless
 * you set `recurse` to `true`.
 */
export function copy(entity, recurse=false) {
	if (! entity) {entity = this;}
	const result = Object.create(entity.constructor.prototype);
	const keys = Object.keys(entity).filter(val => val !== 'id');
	for (let i=0,key; key=keys[i]; i++) {
		const val = entity[key];
		result[key] = val && val.copy && recurse ? val.copy() : val;
	}
	return result;
}

export function revive(key, value) {
	log.trace('revive', key, value);
	const t = value && typeof value == 'object' && typeof value.type == 'string' && value.type;
	const type = t && registry[t];
	const result = type ? type.fromJSON(value) : Suid.revive((k) => idKey(k))(key, value);
	log.trace('revive => ', result);
	return result;
}

export function register(name, type) {
	function enhance(entity, obj) {
		Object.defineProperty(entity, 'id', {enumerable:true,
			get:function(){return this.__id;},
			set:function(id) {Object.defineProperty(this, '__id', {value:id});},
		});
		Object.defineProperty(entity, 'version', {enumerable:true,
			get:function(){return this.__version;},
			set:function(version) {Object.defineProperty(this, '__version', {value:version});},
		});
		const keys = obj && Object.keys(obj) || [];
		for (let i=0,key; key=keys[i]; i++) {entity[key] = obj[key];}
		if (keys.indexOf('version') === -1) {entity.version = null;}
	}
	let wrapped;
	eval(`
		wrapped = function ${name}(obj){
			enhance(this, obj);
			type.apply(this, arguments);
		};
	`);
	wrapped.prototype = Object.create(type.prototype);
	wrapped.toString = type.toString.bind(wrapped);
	registry[name] = wrapped;
	if (! wrapped.prototype.toJSON) {Object.defineProperty(wrapped.prototype, 'toJSON', {value:toJSON});}
	if (! wrapped.prototype.equals) {Object.defineProperty(wrapped.prototype, 'equals', {value:equals});}
	if (! wrapped.prototype.clone) {Object.defineProperty(wrapped.prototype, 'clone', {value:clone});}
	if (! wrapped.fromJSON) {Object.defineProperty(wrapped, 'fromJSON', {value:fromJSON});}
	return wrapped;
}

const registry = {};

function idKey(key) {
	return key === 'id' || key.substring && key.substring(key.length - 2) === 'Id';
}

function hasEquals(obj) {
	return obj && typeof obj.equals == 'function';
}