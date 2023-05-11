import { useState, FormEvent } from "react";
import "./User.css"
import axios from "axios";

interface UserProps{
    displayName: string;
    about: string;
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
                {userInfo!==null &&
                    <div>
                        <h3>{userInfo.displayName}</h3>
                        <pre className="user-about">{userInfo.about}</pre>
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