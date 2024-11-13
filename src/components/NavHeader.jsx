import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Input, Select} from "antd";
import LoginAvatar from "./LoginAvatar";

const {Search} = Input;

const options = [
    {
        value: 'issues',
        label: '问答',
    },
    {
        value: 'books',
        label: '书籍',
    },
];

function NavHeader({handleLogin}) {
    const navigate = useNavigate();
    const [currentOption, setCurrentOption] = useState('issues')

    function onSearch(value) {
        if (value) {
            navigate("/search", {
                state: {
                    value,
                    currentOption
                }
            })
        } else {
            navigate("/");
        }
    }

    function onChange(value) {
        setCurrentOption(value);
    }

    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <div className="logo"></div>
            </div>
            <nav className="navContainer">
                <NavLink to="/" className="navgation">问答</NavLink>
                <NavLink to="/books" className="navgation">书籍</NavLink>
                <NavLink to="/interviews" className="navgation">面试题</NavLink>
                <a
                    href="https://duyi.ke.qq.com/"
                    className="navgation"
                    target="_blank"
                    rel="noreferrer"
                >视频教程</a>
            </nav>
            <div className="searchContainer">
                <Select
                    value={currentOption}
                    options={options}
                    size="large"
                    style={{width: "20%"}}
                    onChange={onChange}
                />
                <Search
                    placeholder="请输入"
                    style={{width: '80%'}}
                    enterButton="搜索"
                    size="large"
                    allowClear
                    onSearch={onSearch}
                />
            </div>
            <div className="loginBtnContainer">
                <LoginAvatar handleLogin={handleLogin}/>
            </div>
        </div>
    );
}

export default NavHeader;