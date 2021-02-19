export interface NbTypeBinding {
	type: 'boolean' | 'int' | 'float' | 'string' | 'array' | 'custom' | 'method';
	parameters: string[];
	id: string;
	label: string;
	const?: boolean;
}

export interface NbFunctionStatement {
	type: 'fn';
	body: NbBlock;
	id: string;
	parameters: NbTypeBinding[];
}

export interface NbHookStatement {
	type: 'hook';
	to: NbExpression;
	as?: NbTypeBinding;
	body: NbBlock;
}

export interface NbIfStatement {
	type: 'if';
	condition: NbExpression;
	consequent: NbBlock;
	alternate?: NbBlock;
}

export interface NbBlock {
	bindings: NbTypeBinding[];
	body: NbStatement[];
}

export interface NbForOfStatement {
	type: 'forof';
	as: NbTypeBinding;
	of: NbExpression;
	body: NbBlock;
}

export interface NbBinaryExpression {
	type: 'binary';
	operator: '==' | '*' | '+' | '-' | '/' | '**';
	left: NbExpression;
	right: NbExpression;
}

export interface NbItemExpression {
	type: 'item';
	of: NbExpression;
	item: NbExpression;
}

export interface NbBooleanExpression {
	type: 'boolean';
	value: boolean;
}

export interface NbIntExpression {
	type: 'int';
	value: number;
}

export interface NbFloatExpression {
	type: 'float';
	value: number;
}

export interface NbStringExpression {
	type: 'string';
	value: string;
}

export interface NbIdentifierExpression {
	type: 'identifier';
	id: string;
}

export interface NbHookExpression {
	type: 'hook';
	to: NbExpression;
}

export interface NbAsyncStatement {
	type: 'async';
	body: NbStatement[];
}

export interface NbAmbientStatement {
	type: 'ambient';
	expression: NbExpression;
}

export interface NbCallExpression {
	type: 'call';
	callee: NbExpression;
	parameters: NbExpression[];
}

export interface NbExpressionStatement {
	type: 'expression';
	expression: NbExpression;
}

export interface NbMemberExpression {
	type: 'member';
	of: NbExpression;
	property: string;
}

export interface NbAssignmentExpression {
	type: 'set';
	left: NbIdentifierExpression;
	right: NbExpression;
}

export interface NbReturnStatement {
	type: 'return';
	argument: NbExpression;
}

export type NbStatement =
	| NbFunctionStatement
	| NbHookStatement
	| NbIfStatement
	| NbForOfStatement
	| NbAmbientStatement
	| NbAsyncStatement
	| NbExpressionStatement
	| NbReturnStatement;

export type NbExpression =
	| NbBinaryExpression
	| NbItemExpression
	| NbIntExpression
	| NbFloatExpression
	| NbBooleanExpression
	| NbStringExpression
	| NbHookExpression
	| NbCallExpression
	| NbIdentifierExpression
	| NbMemberExpression
	| NbAssignmentExpression;
