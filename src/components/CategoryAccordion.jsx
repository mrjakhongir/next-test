'use client';
import { useState } from 'react';

import Image from 'next/image';
import caret from '../../public/caret.svg';

function CategoryAccordion() {
	const [openBody, setOpenBody] = useState(false);
	return (
		<div className='category-accordion'>
			<div className='accordion__label' onClick={() => setOpenBody(!openBody)}>
				<span>Category</span>
				<Image
					className={`${openBody && 'rotate-caret'}`}
					src={caret}
					alt='caret'
				/>
			</div>
			<div className={`accordion__body ${openBody && 'accordion__body_open'}`}>
				<ul className='accordion__body_inner'>
					<li>
						<a href='#'>All categories</a>
					</li>
					<li>
						<a href='#'>Accounting & Consulting</a>
					</li>
					<li>
						<a href='#'>Admin Support</a>
					</li>
					<li>
						<a href='#'>Customer Service</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default CategoryAccordion;
