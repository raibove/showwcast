import React from 'react';
import {Composition, Folder} from 'remotion';
import {Portfolio} from './Portfolio';

export const PortfolioComposition: React.FC = () => {
	return (
		<Folder name="Portfolio">
			<Composition
				component={Portfolio}
				width={1200}
				height={1200}
				id="Portfolio"
				fps={30}
				durationInFrames={270}
				defaultProps={{
					title: 'Shweta Kale',
				}}
			/>
		</Folder>
	);
};