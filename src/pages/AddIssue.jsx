import React, {useEffect, useRef, useState} from 'react';
import styles from '../style/AddIssue.module.css'
import {Button, Form, Input, message, Select} from "antd";
import {Editor} from "@toast-ui/react-editor";
import {useDispatch, useSelector} from "react-redux";
import {typeOptionCreator} from "../utils/tools";
import '@toast-ui/editor/dist/toastui-editor.css';
import {getTypeListAsync} from "../redux/typeSlice";
import {addIssueApi} from "../api/issue";
import {useNavigate} from "react-router-dom";

/**
 * 新增问答
 */
function AddIssue() {
    const [form, setForm] = useState({
        issueTitle: "",
        issueContent: "",
        userId: "",
        typeId: ""
    });
    const formRef = useRef();
    const editorRef = useRef();
    const {typeList} = useSelector(state => state.type);
    const {userInfo} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(typeList.length === 0) {
            dispatch(getTypeListAsync());
        }
    }, [dispatch, typeList]);

    async function handleAdd() {
        const content = editorRef.current.getInstance().getHTML();
        await addIssueApi({
            ...form,
            issueContent: content,
            userId: userInfo._id
        });
        navigate("/");
        message.success("您的问题已经提交，审核通过后进行展示")
    }

    function updateInfo(value, key) {
        setForm({
            ...form,
            [key]: value
        })
    }

    function handleChange(value) {
        setForm({
            ...form,
            typeId: value
        })
    }

    return (
        <div className={styles.container}>
            <Form
                name="basic"
                ref={formRef}
                initialValues={form}
                autoComplete="off"
                onFinish={handleAdd}
            >
                {/* 问答标题 */}
                <Form.Item
                    label="标题"
                    name="issueTitle"
                    rules={[{ required: true, message: '请输入标题' }]}
                >
                    <Input
                        placeholder="请输入标题"
                        size="large"
                        value={form.issueTitle}
                        onChange={(e) => updateInfo(e.target.value, 'issueTitle')}
                    />
                </Form.Item>

                {/* 问题类型 */}
                <Form.Item
                    label="问题分类"
                    name="typeId"
                    rules={[{ required: true, message: '请选择问题所属分类' }]}
                >
                    <Select
                        style={{ width: 200 }}
                        onChange={handleChange}
                    >
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                </Form.Item>


                {/* 问答内容 */}
                <Form.Item
                    label="问题描述"
                    name="issueContent"
                    rules={[{ required: true, message: '请输入问题描述' }]}
                >
                    <Editor
                        ref={editorRef}
                        initialValue=""
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        language='zh-CN'
                    />
                </Form.Item>


                {/* 确认按钮 */}
                <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确认新增
                    </Button>

                    <Button type="link" htmlType="submit" className="resetBtn">
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddIssue;