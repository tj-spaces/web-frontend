import {NbBlock, NbExpression, NbStatement} from './ASTTypes';

export const defaultExpressions: Record<NbExpression['type'], NbExpression> = {
	assignment: {
		type: 'assignment',
		left: {
			type: 'identifier',
			id: 'id_0',
		},
		right: {
			type: 'int',
			value: 0,
		},
	},
	binary: {
		type: 'binary',
		operator: '==',
		left: {type: 'int', value: 1},
		right: {type: 'int', value: 1},
	},
	call: {
		type: 'call',
		callee: {
			type: 'identifier',
			id: 'announce',
		},
		parameters: [
			{
				type: 'string',
				value: 'Hello World!',
			},
		],
	},
	identifier: {
		type: 'identifier',
		id: 'id_0',
	},
	int: {
		type: 'int',
		value: 0,
	},
	float: {
		type: 'float',
		value: 0,
	},
	hook: {
		type: 'hook',
		to: {
			type: 'identifier',
			id: 'id_0',
		},
	},
	item: {
		type: 'item',
		of: {
			type: 'identifier',
			id: 'id_0',
		},
		item: {
			type: 'int',
			value: 0,
		},
	},
	member: {
		type: 'member',
		property: 'test',
		of: {
			type: 'identifier',
			id: 'id_0',
		},
	},
	boolean: {
		type: 'boolean',
		value: true,
	},
	string: {
		type: 'string',
		value: '',
	},
};

export const defaultBlock: NbBlock = {
	bindings: [],
	body: [],
};

export const defaultStatements: Record<NbStatement['type'], NbStatement> = {
	fn: {
		type: 'fn',
		id: 'id_0',
		parameters: [],
		body: defaultBlock,
	},
	hook: {
		type: 'hook',
		to: {
			type: 'identifier',
			id: 'id_0',
		},
		body: {
			body: [],
			bindings: [],
		},
	},
	if: {
		type: 'if',
		condition: {
			type: 'boolean',
			value: true,
		},
		consequent: defaultBlock,
	},
	forof: {
		type: 'forof',
		of: {
			type: 'call',
			callee: {
				type: 'identifier',
				id: 'get_values',
			},
			parameters: [],
		},
		as: {
			type: 'int',
			id: 'item',
			label: 'Item',
			parameters: [],
		},
		body: {
			body: [],
			bindings: [],
		},
	},
	ambient: {
		type: 'ambient',
		expression: {
			type: 'call',
			callee: {
				type: 'identifier',
				id: 'listen_for_changes',
			},
			parameters: [],
		},
	},
	async: {
		type: 'async',
		body: {
			body: [],
			bindings: [],
		},
	},
	expression: {
		type: 'expression',
		expression: {
			type: 'identifier',
			id: 'id_0',
		},
	},
	return: {
		type: 'return',
		argument: {
			type: 'boolean',
			value: true,
		},
	},
};
