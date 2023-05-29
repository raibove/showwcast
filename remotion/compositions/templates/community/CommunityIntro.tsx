import React from "react"
import { AbsoluteFill, Img } from "remotion"

export const CommunityIntro: React.FC<{
    profileUrl: string;
    profileTitle: string;
    profileHeadline: string;
    threadTitle: string;
    threadDescription: string;
}> = ({profileUrl, profileTitle, profileHeadline, threadTitle, threadDescription})=>{
    return(
        <>
            <AbsoluteFill style={{backgroundColor:'white'}}>
                <AbsoluteFill style={{display:'flex'}}>
                    <div>
                        <Img src={profileUrl} />
                    </div>
                    <div>
                        <h1>{profileTitle}</h1>
                        <h2>{profileHeadline}</h2>
                        <h1>{threadTitle}</h1>
                        <p>{threadDescription}</p>
                    </div>
                </AbsoluteFill>
            </AbsoluteFill>
        </>
    )
}