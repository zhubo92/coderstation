import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Button, List, Popover} from "antd";
import {UserOutlined} from '@ant-design/icons';
import styles from '../style/LoginAvatar.module.css'
import {changeLoginStatus, clearUserInfo} from "../redux/userSlice";
import {useNavigate} from "react-router-dom";
// 用户头像，没登录的话，显示登录按钮
function LoginAvatar({handleLogin}) {
    const {isLogin, userInfo} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick(item) {
        console.log(item,'handleClick');
        if(item === '个人中心') {
            navigate("/personalCenter");
        } else {
            localStorage.removeItem('userToken');
            dispatch(clearUserInfo());
            dispatch(changeLoginStatus(false));
            navigate("/");
        }
    }

    let loginStatus = null;
    if(isLogin) {
        const content = (
            <List
                dataSource={['个人中心', '退出登录']}
                size="large"
                renderItem={(item) => {
                    return <List.Item style={{cursor: "pointer"}} onClick={() => handleClick(item)}>{item}</List.Item>
                }}
            />
        )

        loginStatus = (
            <Popover content={content} trigger="hover" placement="bottom">
                <div className={styles.avatarContainer}>
                    <Avatar src={userInfo?.avatar} size="large" icon={<UserOutlined />} />
                </div>
            </Popover>
        )
    } else {
        loginStatus = <Button type="primary" size="large" onClick={handleLogin}>注册/登录</Button>
    }

    return (
        <div>{loginStatus}</div>
    );
}

export default LoginAvatar;