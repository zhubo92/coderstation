import React from 'react';
import {Button, message} from "antd";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

/**
 * 添加问答
 */
function AddIssue() {
    const {isLogin} = useSelector(state => state.user);
    const navigate = useNavigate();

    // 跳转到添加问答页面，要判断是否登录
    async function handleClick() {
        if(isLogin) {
            navigate('/addIssue');
        } else {
            message.warning('请先登录');
        }
    }

    return (
        <Button
            type="primary"
            size="large"
            style={{
                width: '100%',
                marginBottom: '30px'
            }}
            onClick={handleClick}
        >我要发问</Button>
    );
}

export default AddIssue;