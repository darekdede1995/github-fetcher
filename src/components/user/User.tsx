import React from 'react'
import './User.css';
import {UserInterface} from "../../types";
import company from '../../svg/company.svg';
import link from '../../svg/link.svg';
import location from '../../svg/location.svg';

interface IUserProps {
    user: UserInterface;
}

function User({user}: IUserProps) {

    const handleUserClick = () => {
        window.open(user?.html_url, '_blank');
    }

    return user ? (
        <div className="user_root" onClick={handleUserClick}>
            <div className="user_avatar" style={{background: `url("${user.avatar_url}")`}}/>
            <div className="user_baseInfo">
                <div>
                    {!!user.name && <span className="user_name">{user.name}</span>}
                    <span className="user_login">{`@${user.login}`}</span>
                </div>
                <span className="user_id">{`#${user.id}`}</span>
                <span className="user_followers">{`Followers: ${user.followers}`}</span>
                <span className="user_following">{`Following: ${user.following}`}</span>
            </div>
            <div className="user_additionalInfo">
                {!!user.company && <div>
                    <img src={company} alt="company"/>
                    {user.company}
                </div>}
                {!!user.blog && <div>
                  <img src={link} alt="blog"/>
                    {user.blog}
                </div>}
                {!!user.location && <div>
                  <img src={location} alt="location"/>
                    {user.location}
                </div>}
            </div>
        </div>
    ) : null;
}

export default User;
