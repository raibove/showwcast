import {AbsoluteFill, Sequence, Img} from 'remotion';
import React from 'react';
import dot from './dot.jpg'

export const Portfolio: React.FC<{
    backgroundImg?: string;
	title: string;
	fontFamily?: string;
}> = ({backgroundImg = dot,
title}) => {
	return (
		<AbsoluteFill
			style={{
				overflow: 'hidden'
			}}
		>
            <Sequence name="Background">
            <Img
				src={backgroundImg}
				style={{
						width:'100%'
				}}
			/>
			</Sequence>
			<Sequence from={50} durationInFrames={130} name="Event title">
				<p style={{fontSize:"80px", textAlign:'center', color:'black'}}>{title}</p>
			</Sequence>
		</AbsoluteFill>
	);
};