/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useState} from 'react';
import BaseRow from '../base/BaseRow';
import {NbFunctionStatement} from './ASTTypes';
import NblaFunctionEditor from './NblaFunctionEditor';

export default function TestNbla() {
	let [fns, setFns] = useState<NbFunctionStatement[]>([]);

	return (
		<BaseRow direction="row">
			<BaseRow direction="column" flex={2} spacing={1}>
				<button
					onClick={() =>
						setFns([
							...fns,
							{
								type: 'fn',
								id: '__fn' + fns.length,
								parameters: [],
								body: {
									body: [],
									bindings: [],
								},
							},
						])
					}
				>
					Add function
				</button>
				{fns.map((fn, idx) => {
					return (
						<>
							<NblaFunctionEditor
								key={idx}
								fn={fn}
								setFn={(fn) =>
									setFns([...fns.slice(0, idx), fn, ...fns.slice(idx + 1)])
								}
							/>
							<button
								onClick={() =>
									setFns([...fns.slice(0, idx), ...fns.slice(idx + 1)])
								}
							>
								Delete
							</button>
						</>
					);
				})}
			</BaseRow>
			<BaseRow direction="column" flex={1}>
				<pre>{JSON.stringify(fns, null, 4)}</pre>
			</BaseRow>
		</BaseRow>
	);
}
