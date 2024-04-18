'use client';

import Image from 'next/image';
import caret from '../../public/caret.svg';
import rate from '../../public/rate.svg';
import { useState } from 'react';

function TalentAccordion() {
	const [openBody, setOpenBody] = useState(false);
	return (
		<div className='talent-accordion'>
			<div className='accordion__label' onClick={() => setOpenBody(!openBody)}>
				<span>
					Talent badge <span className='label__question'>?</span>
				</span>
				<Image
					className={`${openBody && 'rotate-caret'}`}
					src={caret}
					alt='caret'
				/>
			</div>
			<div className={`accordion__body ${openBody && 'accordion__body_open'}`}>
				<ul className='accordion__body_inner'>
					<li className='accordion__rate'>
						<input type='checkbox' id='topRatePlus' />
						<label htmlFor='topRatePlus'>
							<Image src={rate} alt='rating badge' />
							<span>Top Rated Plus</span>
						</label>
					</li>
					<li className='accordion__rate'>
						<input type='checkbox' id='topRate' />
						<label htmlFor='topRate'>
							<Image src={rate} alt='rating badge' />
							<span>Top Rated</span>
						</label>
					</li>
					<li className='accordion__rate'>
						<input type='checkbox' id='risingTalent' />
						<label htmlFor='risingTalent'>
							<Image src={rate} alt='rating badge' />
							<span>Rising Talent</span>
						</label>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default TalentAccordion;
