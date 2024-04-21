'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import caret from '../../../public/caret.svg';
import data from '../../data';

const talentTypes = data.talentTypes;

function TalentTypeAccordion() {
	const [openBody, setOpenBody] = useState(true);
	const [talentType, setTalentType] = useState('');

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const setTalentTypeParams = (key, value) => {
		params.set(key, value);
		replace(`${pathname}?${params.toString()}`);
		setTalentType(value);
	};

	useEffect(() => {
		setTalentType(params.get('talent_type'));
	}, [searchParams]);

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
					{talentTypes.map((item) => (
						<li key={item.name}>
							<label htmlFor={item.name}>
								<input
									type='radio'
									id={item.name}
									name='type'
									checked={talentType === item.value}
									onChange={() => setTalentTypeParams(item.key, item.value)}
								/>
								<span>{item.name}</span>
							</label>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default TalentTypeAccordion;
