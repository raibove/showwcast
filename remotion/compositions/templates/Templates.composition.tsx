import React from 'react';
import {Folder} from 'remotion';
import { PortfolioComposition } from './portfolio/Portfolio.composition';

export const TemplatesComposition: React.FC = () => {
	return (
		<Folder name="Templates">
			<PortfolioComposition />
		</Folder>
	);
};