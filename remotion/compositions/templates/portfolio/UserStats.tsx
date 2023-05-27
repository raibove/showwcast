import { AbsoluteFill } from "remotion"
import { loadFont } from "@remotion/google-fonts/Lobster";
import React from "react";
const { fontFamily } = loadFont(); 

interface StatsProps {
    name: string;
    value: number;
}

export const UserStats: React.FC<{
    stats: StatsProps[]
}> = ({stats})=>{
    return(
            <AbsoluteFill style={{
                backgroundColor: '#F5F0BB',
                display: 'flex',
                justifyContent:'space-evenly',
                alignItems:'center',
                fontSize: '90px',
                color: 'black',
                padding: '80px 50px',
                textAlign:'center',
                fontFamily: fontFamily
            }}>
                <p>I have {stats[0].value} followers</p>
                <p>Collaborated with {stats[1].value} community members</p>
                <p>Wrote {stats[2].value} threads and published {stats[3].value} show. </p>
            </AbsoluteFill>
    )
}