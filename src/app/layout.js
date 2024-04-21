import { Inter } from 'next/font/google';
import '../styles/main.scss';
import Sidebar from '@/components/Sidebar/Sidebar';
import FilteredCriterias from '@/components/FilteredCriterias';

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
					<FilteredCriterias />
					<div className='home-content'>
						<Sidebar />
						<>{children}</>
					</div>
				</div>
			</body>
		</html>
	);
}
