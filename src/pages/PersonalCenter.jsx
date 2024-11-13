import React, {useState} from 'react';
import PageHeader from "../components/PageHeader";
import styles from '../style/PersonalCenter.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Form, Image, Modal, Upload, Input, message} from "antd";
import PersonalInfoItem from "../components/PersonalInfoItem";
import {formatDate} from "../utils/tools";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {updateUserInfoAsync} from "../redux/userSlice";
import {checkPasswordIsRightApi} from "../api/user";

/**
 * 个人中心
 */
function PersonalCenter() {
    const {userInfo} = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [isShow, setIsShow] = useState(false);
    const [panelName, setPanelName] = useState('');
    const [passwordInfo, setPasswordInfo] = useState({});
    const [editInfo, setEditInfo] = useState({});
    const dispatch = useDispatch();

    function handleUpload({file}) {
        const {status, response} = file;
        if (status === 'uploading') {
            setLoading(true);
            return;
        }
        if (status === 'done') {
            setLoading(false);
            setAvatar(response.data);
            changeAvatar(response.data);
            console.log('上传完毕', response.data);
        }
    }

    function changeAvatar(ava) {
        dispatch(updateUserInfoAsync({
            userId: userInfo._id,
            newInfo: {
                avatar: ava
            }
        }))
    }

    function handleEdit(name) {
        setPanelName(name);
        setIsShow(true);
    }

    function handleOk() {
        dispatch(updateUserInfoAsync({
            userId: userInfo._id,
            newInfo: editInfo
        }));
        setIsShow(false);
        message.success("信息修改成功！");
    }

    function updatePasswordInfo(newInfo, key) {
        const newPasswordInfo = {...passwordInfo};
        newPasswordInfo[key] = newInfo.trim();
        setPasswordInfo(newPasswordInfo);
        // 如果是新密码框，更新 editInfo 的内容
        if (key === "newpassword") {
            updateInfo(newInfo, 'loginPwd');
        }
    }

    function updateInfo(newInfo, key) {
        if (key === 'nickname' && !newInfo) {
            message.error("昵称不能为空");
            return;
        }
        const newUserInfo = {...editInfo};
        if (typeof newInfo === 'string') {
            newUserInfo[key] = newInfo.trim();
        } else {
            newUserInfo[key] = newInfo;
        }
        setEditInfo(newUserInfo)
    }

    async function checkPassword() {
        if (passwordInfo.oldpassword) {
            const {data} = await checkPasswordIsRightApi(userInfo._id, passwordInfo.oldpassword);
            if (!data) {
                return Promise.reject("密码不正确");
            }
        }
    }

    const uploadButton = (
        <button style={{border: 0, background: 'none',}} type="button">
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8,}}>上传</div>
        </button>
    );

    const uploadStatus = avatar ? (
        <div style={{padding: '5px'}}>
            <img src={avatar} alt="avatar" style={{width: '100%'}}/>
        </div>
    ) : (
        uploadButton
    );

    let modalContent = null;
    switch (panelName) {
        case "基本信息": {
            modalContent = (
                <Form
                    name="basic1"
                    autoComplete="off"
                    initialValues={userInfo}
                    onFinish={handleOk}
                >
                    {/* 登录密码 */}
                    <Form.Item
                        label="登录密码"
                        name="oldpassword"
                        rules={[
                            {
                                validator: checkPassword
                            }
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input.Password
                            rows={6}
                            value={passwordInfo.oldpassword}
                            placeholder="如果要修改密码，请先输入旧密码"
                            onChange={(e) => updatePasswordInfo(e.target.value, 'oldpassword')}
                        />
                    </Form.Item>

                    {/* 新的登录密码 */}
                    <Form.Item
                        label="新密码"
                        name="newpassword"
                    >
                        <Input.Password
                            rows={6}
                            value={passwordInfo.newpassword}
                            placeholder="请输入新密码"
                            onChange={(e) => updatePasswordInfo(e.target.value, 'newpassword')}
                        />
                    </Form.Item>

                    {/* 确认密码 */}
                    <Form.Item
                        label="确认密码"
                        name="passwordConfirm"
                        rules={[
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newpassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次密码不一致'));
                                },
                            }),
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input.Password
                            rows={6}
                            placeholder="请确认密码"
                            value={passwordInfo.passwordConfirm}
                            onChange={(e) => updatePasswordInfo(e.target.value, 'passwordConfirm')}
                        />
                    </Form.Item>

                    {/* 用户昵称 */}
                    <Form.Item
                        label="用户昵称"
                        name="nickname"
                    >
                        <Input
                            placeholder="昵称可选，默认为新用户"
                            value={userInfo.nickname}
                            onBlur={(e) => updateInfo(e.target.value, 'nickname')}
                        />
                    </Form.Item>

                    {/* 确认修改按钮 */}
                    <Form.Item wrapperCol={{offset: 5, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>

                        <Button type="link" htmlType="submit" className="resetBtn">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            );
            break;
        }
        case "社交账号": {
            modalContent = (
                <Form
                    name="basic2"
                    initialValues={userInfo}
                    autoComplete="off"
                    onFinish={handleOk}
                >
                    <Form.Item label="邮箱" name="mail">
                        <Input
                            value={userInfo.mail}
                            placeholder="请填写邮箱"
                            onChange={(e) => updateInfo(e.target.value, 'mail')}
                        />
                    </Form.Item>
                    <Form.Item label="QQ号" name="qq">
                        <Input
                            value={userInfo.qq}
                            placeholder="请填写 QQ 号"
                            onChange={(e) => updateInfo(e.target.value, 'qq')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="微信"
                        name="wechat"
                    >
                        <Input
                            value={userInfo.wechat}
                            placeholder="请填写微信号"
                            onChange={(e) => updateInfo(e.target.value, 'wechat')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="github"
                        name="github"
                    >
                        <Input
                            value={userInfo.github}
                            placeholder="请填写 github "
                            onChange={(e) => updateInfo(e.target.value, 'github')}
                        />
                    </Form.Item>

                    {/* 确认修改按钮 */}
                    <Form.Item wrapperCol={{offset: 5, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>

                        <Button type="link" htmlType="submit" className="resetBtn">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            );
            break;

        }
        case "个人简介": {
            modalContent = (
                <Form
                    name="basic3"
                    initialValues={userInfo}
                    autoComplete="off"
                    onFinish={handleOk}
                >
                    {/* 自我介绍 */}
                    <Form.Item
                        label="自我介绍"
                        name="intro"
                    >
                        <Input.TextArea
                            rows={6}
                            value={userInfo.intro}
                            placeholder="选填"
                            onChange={(e) => updateInfo(e.target.value, 'intro')}
                        />
                    </Form.Item>

                    {/* 确认修改按钮 */}
                    <Form.Item wrapperCol={{offset: 5, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>

                        <Button type="link" htmlType="submit" className="resetBtn">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            );
            break;
        }
        default:
    };

    return (
        <div>
            <PageHeader title="个人中心"/>
            {/* 信息展示 */}
            <div className={styles.container}>
                {/* 基本信息 */}
                <div className={styles.row}>
                    <Card
                        title="基本信息"
                        extra={
                            <div className={styles.edit} onClick={() => handleEdit('基本信息')}>编辑</div>
                        }
                    >
                        <PersonalInfoItem title="登录账号" value={userInfo.loginId}/>
                        <PersonalInfoItem title="账号密码" value="*** *** ***"/>
                        <PersonalInfoItem title="用户昵称" value={userInfo.nickname}/>
                        <PersonalInfoItem title="用户积分" value={userInfo.points}/>
                        <PersonalInfoItem title="注册时间" value={formatDate(userInfo.registerDate)}/>
                        <PersonalInfoItem title="上次登录时间" value={formatDate(userInfo.lastLoginDate)}/>
                        <div style={{fontWeight: '100', height: '50px'}}>当前头像</div>
                        <Image src={userInfo.avatar} width={100}/>
                        <div style={{fontWeight: '100', height: '50px'}}>上传新头像</div>
                        <Upload
                            action="/api/upload"
                            listType="picture-card"
                            maxCount={1}
                            showUploadList={false}
                            onChange={handleUpload}
                        >
                            {uploadStatus}
                        </Upload>
                    </Card>
                </div>
                {/* 社交账号 */}
                <div className={styles.row}>
                    <Card title="社交账号"
                          extra={<div className={styles.edit} onClick={() => handleEdit('社交账号')}>编辑</div>}>
                        <PersonalInfoItem title="邮箱" value={userInfo.mail ? userInfo.mail : "未填写"}/>
                        <PersonalInfoItem title="QQ号" value={userInfo.qq ? userInfo.qq : "未填写"}/>
                        <PersonalInfoItem title="微信号" value={userInfo.wechat ? userInfo.wechat : "未填写"}/>
                        <PersonalInfoItem title="github" value={userInfo.github ? userInfo.github : "未填写"}/>
                    </Card>
                </div>
                {/* 个人简介 */}
                <div className={styles.row}>
                    <Card title="个人简介"
                          extra={<div className={styles.edit} onClick={() => handleEdit('个人简介')}>编辑</div>}>
                        <p className={styles.intro}>
                            {userInfo.intro ? userInfo.intro : "未填写"}
                        </p>
                    </Card>
                </div>
            </div>

            {/* 修改信息的对话框 */}
            <Modal
                title={panelName}
                open={isShow}
                footer={null}
                onOk={() => setIsShow(false)}
                onCancel={() => setIsShow(false)}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

export default PersonalCenter;