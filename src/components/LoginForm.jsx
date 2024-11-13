import React, {useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Modal, Radio, Row, message} from "antd";
import styles from '../style/LoginForm.module.css'
import {
    addUserApi,
    getCaptchaApi,
    getUserInfoByIdApi,
    userIsExistApi,
    userLoginApi
} from "../api/user";
import {useDispatch} from "react-redux";
import {changeLoginStatus, initUserInfo} from "../redux/userSlice";
function LoginForm({isShow, closeModal}) {
    const [value, setValue] = useState(1);
    const [captcha, setCaptcha] = useState("");
    const [loginInfo, setLoginInfo] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    });
    const [registerInfo, setRegisterInfo] = useState({
        loginId: "",
        nickname: "",
        captcha: ""
    });
    const loginFormRef = useRef();
    const registerFormRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        handleCaptchaClick();
    }, [isShow])

    function handleOk() {

    }

    async function handleLogin() {
        const {data, code, msg} = await userLoginApi(loginInfo);
        if(code === 0) {
            if(!data.data) {
                message.warning("密码错误！");
                await handleCaptchaClick();
            } else if(!data.data.enabled) {
                message.warning("账号被禁用！");
                await handleCaptchaClick();
            } else {
                if(loginInfo.remember) localStorage.setItem('userToken', data.token);
                else sessionStorage.setItem('userToken', data.token);
                await getInfo(data.data._id);
                message.success("登录成功！");
                dispatch(changeLoginStatus(true));
                handleCancel();
                closeModal();
            }
        } else {
            message.warning(msg);
            await handleCaptchaClick();
        }
    }

    async function getInfo(id) {
        const {data} = await getUserInfoByIdApi(id);
        dispatch(initUserInfo(data));
    }

    function handleChange(e) {
        setValue(e.target.value);
        handleCaptchaClick();
    }

    async function handleCaptchaClick() {
        const data = await getCaptchaApi();
        setCaptcha(data);
    }

    async function handleRegister() {
        const {code, msg, data} = await addUserApi(registerInfo);
        if(code === 0) {
            message.success("用户注册成功！默认密码：123456");
            dispatch(initUserInfo(data));
            dispatch(changeLoginStatus(true));
            handleCancel();
            closeModal();
        } else {
            message.warning(msg);
            await handleCaptchaClick();
        }
    }

    function updateInfo(state, value, key, setState) {
        setState({
            ...state,
            [key]: value
        })
    }

    // 验证登录账号是否存在
    async function checkLoginIdIsExist() {
        if(registerInfo.loginId) {
            const {data} = await userIsExistApi(registerInfo.loginId);
            if(data) {
                return Promise.reject('该用户已注册');
            }
        }
    }

    function handleCancel() {
        setRegisterInfo({
            loginId: "",
            nickname: "",
            captcha: ""
        });
        setLoginInfo({
            loginId: "",
            loginPwd: "",
            captcha: "",
            remember: false
        });
    }

    let container = null;
    if(value === 1) {
        container = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    ref={loginFormRef}
                    autoComplete="off"
                    onFinish={handleLogin}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号",
                            },
                        ]}
                    >
                        <Input
                            placeholder="请输入你的登录账号"
                            value={loginInfo.loginId}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入你的登录密码，新用户默认为123456"
                            value={loginInfo.loginPwd}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="captcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={loginInfo.captcha}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={handleCaptchaClick}
                                    dangerouslySetInnerHTML={{ __html: captcha }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
                            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                            checked={loginInfo.remember}
                        >记住我</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            登录
                        </Button>
                        <Button type="primary" htmlType="reset" onClick={handleCancel}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    } else {
        container = (
            <div className={styles.container}>
                <Form
                    name="basic2"
                    autoComplete="off"
                    ref={registerFormRef}
                    onFinish={handleRegister}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号，仅此项为必填项",
                            },
                            // 验证用户是否已经存在
                            { validator: checkLoginIdIsExist },
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input
                            placeholder="请输入账号"
                            value={registerInfo.loginId}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="用户昵称"
                        name="nickname"
                    >
                        <Input
                            placeholder="请输入昵称，不填写默认为新用户xxx"
                            value={registerInfo.nickname}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="registercaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={registerInfo.captcha}
                                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={handleCaptchaClick}
                                    dangerouslySetInnerHTML={{ __html: captcha }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            注册
                        </Button>
                        <Button type="primary" htmlType="reset" onClick={handleCancel}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    return (
        <div>
            <Modal title="注册/登录" footer={null} open={isShow} onOk={handleOk} onCancel={closeModal}>
                <Radio.Group value={value} buttonStyle="solid" className={styles.radioGroup} onChange={handleChange}>
                    <Radio.Button value={1} className={styles.radioButton}>登录</Radio.Button>
                    <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
                </Radio.Group>
                {container}
            </Modal>
        </div>
    );
}

export default LoginForm;