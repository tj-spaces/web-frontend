/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import colors from '../styles/colors';

export default function ColorTest() {
	return (
		<div>
			{Object.entries(colors).map(([name, value]) => {
				return (
					<div style={{width: '10em', height: '10em', backgroundColor: value}}>
						{name}
					</div>
				);
			})}
		</div>
	);
}
