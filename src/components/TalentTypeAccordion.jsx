'use client';
import { useState } from 'react';

import Image from 'next/image';
import caret from '../../public/caret.svg';

function TalentTypeAccordion() {
	const [openBody, setOpenBody] = useState(false);
	return (
		<div className='talent-type-accordion'>
			<div className='accordion__label' onClick={() => setOpenBody(!openBody)}>
				<span>Talent Type</span>
				<Image
					className={`${openBody && 'rotate-caret'}`}
					src={caret}
					alt='caret'
				/>
			</div>
			<div className={`accordion__body ${openBody && 'accordion__body_open'}`}>
				<ul className='accordion__body_inner'>
					<li>
						<input type='radio' id='freelanceAndAgencies' name='type' />
						<label htmlFor='freelanceAndAgencies'>Freelancers & Agencies</label>
					</li>
					<li>
						<input type='radio' id='freelancers' name='type' />
						<label htmlFor='freelancers'>Freelancers</label>
					</li>
					<li>
						<input type='radio' id='agencies' name='type' />
						<label htmlFor='agencies'>Agencies</label>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default TalentTypeAccordion;
