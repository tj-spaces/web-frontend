/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {NbFunctionStatement} from './ASTTypes';
import NblaBlockEditor from './NblaBlockEditor';

export default function NblaFunctionEditor({
	fn,
	setFn,
}: {
	fn: NbFunctionStatement;
	setFn: (newValue: NbFunctionStatement) => void;
}) {
	return (
		<BaseRow direction="column" spacing={1}>
			<BaseText variant="list-item-title">{fn.id}</BaseText>
			<NblaBlockEditor
				block={fn.body}
				setBlock={(block) => setFn({...fn, body: block})}
			/>
		</BaseRow>
	);
}
