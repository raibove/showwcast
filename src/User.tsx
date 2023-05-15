import { useState, FormEvent, useEffect } from "react";
import "./User.css"
import axios from "axios";
import { Player } from "@remotion/player";
import {Portfolio} from '../remotion/compositions/templates/portfolio/Portfolio'

interface UserProps{
    displayName: string;
    about: string;
    profilePictureUrl: string;
}

const User = ()=>{
    const [username, setUsername] = useState("")
    const [userInfo, setUserInfo] = useState<UserProps | null>(null)

    const updateUsername = (e: FormEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setUsername(e.currentTarget.value)
    }

    const getUser = async ()=>{
        try{
        const res = await axios.get(`https://cache.showwcase.com/user/${username}`)
        console.log(res)
        setUserInfo(res.data)
        }catch(err){
            setUserInfo(null)
        }
    }

    return (
        <div className="container">
            <div className="player">
                {/* {userInfo!==null &&
                    <div>
                        <h3>{userInfo.displayName}</h3>
                        <pre className="user-about">{userInfo.about}</pre>
                    </div>
                } */}
                {userInfo!==null &&
                <div
                style={{
                    position: "relative"
                  }}
                >
                    <Player
                        component={Portfolio}
                        inputProps={{ title: userInfo.displayName, src: userInfo.profilePictureUrl }}
                        durationInFrames={270}
                        compositionWidth={1800}
                        compositionHeight={1080}
                        fps={30}
                        style={{
                            width: '100%',
                        }}
                        controls
                    />
                </div>
                }
            </div>
            <div className="form">
                <h3 className="title">
                    Username
                </h3>
                <input
                    className="input"
                    value={username}
                    onChange={updateUsername}
                />
                <br/>
                <br/>
                <button className="submit" onClick={getUser}>Submit</button>
            </div>
        </div>
    )
}

export default User;