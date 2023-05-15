import {AbsoluteFill, Sequence, Img, spring, interpolate,useCurrentFrame, useVideoConfig} from 'remotion';
import React from 'react';

export const Portfolio: React.FC<{
    backgroundImg?: string;
	title: string;
	src?: string;
	fontFamily?: string;
}> = ({title, src}) => {

	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = interpolate(frame, [10, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	
	return (
		<AbsoluteFill
			style={{
				overflow: 'hidden',
				backgroundColor: 'white'
			}}
		>        
			<Sequence from={0} durationInFrames={120} name="Event image">
				<Img 
					src={src} 
					style={{
						position: 'absolute',
						borderRadius: 30,
						left: '10%',
						top: '20%',
						height: '50%',
						transform: `scale(${scale})`,
						filter: 'drop-shadow(0px 0px 15px #000000)',
					}}
				/>
				<div
					style={{
						position:'absolute',
						right:'10%',
					}}
				>
					<p style={{fontSize:"80px", textAlign:'center', color:'black'}}>{title}</p>
				</div>
			</Sequence>
		</AbsoluteFill>
	);
};