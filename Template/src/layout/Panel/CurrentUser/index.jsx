// styled components
import { Menu, UserWrapper } from '../style';

// components
// import Avatar from '@ui/Avatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

// utils
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useState } from 'react';

// assets
import doc1jpg from '@assets/avatars/doc1.jpg';
import doc1webp from '@assets/avatars/doc1.jpg?as=webp';
import { useNavigate } from 'react-router-dom';

const CurrentUser = () => {
    const [open, setOpen] = useState(false);
    const handleClickAway = () => setOpen(false);
    const handleClick = () => setOpen(!open);
    const navigate = useNavigate()

    const name = localStorage.getItem("loginName")
    const email = localStorage.getItem("loginEmail")

    const src = {
        jpg: doc1jpg,
        webp: doc1webp
    }
    const handleLogout = () => {
        localStorage.removeItem('loginToken');
        navigate('/login');
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <UserWrapper>
                <Avatar>
                    <PersonIcon />
                </Avatar>
                <div className="info">
                    <span className="h3">{name}</span>
                    <span className="position">{email}</span>
                    <Menu  className={open ? 'visible' : ''}>
                        <button onClick={handleLogout} style={{fontWeight:"bold"}}>
                            <i className="icon icon-logout" /><span>Logout</span> 
                        </button>
                        <button>
                            <i className="icon icon-circle-user" /> Change user
                        </button>

                    </Menu>
                </div>
                <button className="trigger" onClick={handleClick} aria-label="Show menu">
                    <i className="icon icon-chevron-down" />
                </button>
            </UserWrapper>
        </ClickAwayListener>
    )
}

export default CurrentUser;