import { Inter } from 'next/font/google';
import '../styles/main.scss';
import Sidebar from '@/components/Sidebar/Sidebar';
import FilteredCriterias from '@/components/FilteredCriterias';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Next Test',
	description: 'For testing project',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='home-layout'>
					<Suspense fallback={'loading'}>
						<FilteredCriterias />
					</Suspense>
					<div className='home-content'>
						<Suspense fallback={'loading'}>
							<Sidebar />
						</Suspense>
						<Suspense fallback={'loading'}>{children}</Suspense>
					</div>
				</div>
			</body>
		</html>
	);
}
