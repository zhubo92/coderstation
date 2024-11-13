import React, {useEffect, useRef, useState} from 'react';
import {Comment} from '@ant-design/compatible';
import {useDispatch, useSelector} from "react-redux";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Form, List, message, Pagination, Tooltip} from "antd";
import {Editor} from "@toast-ui/react-editor";
import {addCommentApi, getBookCommentByIdApi, getIssueCommentByIdApi} from "../api/comment";
import {getUserInfoByIdApi} from "../api/user";
import {formatDate} from "../utils/tools";
import {updateIssueByIdApi} from "../api/issue";
import {updateUserInfoAsync} from "../redux/userSlice";
import {updateBookApi} from "../api/book";

/**
 * 评论组件
 */
function Discuss({commentType, targetId, issueDetail, bookDetail}) {
    const {isLogin, userInfo} = useSelector(state => state.user);
    const editorRef = useRef();
    const [commentList, setCommentList] = useState([]);
    const [params, setParams] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            let request = null;
            if (commentType === 1) { // 问答评论
                request = getIssueCommentByIdApi;
            } else if (commentType === 2) { // 书籍评论
                request = getBookCommentByIdApi;
            }
            const {data} = await request(targetId, {
                current: params.current,
                pageSize: params.pageSize
            });
            const list = data.data;
            setParams({
                ...params,
                total: data.count
            })

            for (let i = 0; i < list.length; i++) {
                const {data} = await getUserInfoByIdApi(list[i].userId);
                list[i].userInfo = data;
            }

            setCommentList(list);
        }

        if (targetId) fetchData();
    }, [targetId, commentType, params.current, params.pageSize, refresh])

    function onChange(page, pageSize) {
        setParams({
            ...params,
            current: page,
            pageSize
        })
    }

    async function handleSubmit() {
        const editorContent = editorRef.current.getInstance().getHTML();
        if (!editorContent || editorContent === '<p><br></p>') {
            message.warning('请输入评论内容');
            return;
        }
        const {code, msg} = await addCommentApi({
            userId: userInfo?._id,
            typeId: issueDetail?.typeId || bookDetail?.typeId,
            commentContent: editorContent,
            commentType,
            bookId: commentType === 1 ? null : targetId,
            issueId: commentType === 1 ? targetId : null
        });
        if (code === 0) {
            message.success('评论成功！');
            editorRef.current.getInstance().setHTML('');
            setRefresh(!refresh);
            if (commentType === 1) {
                await updateIssueByIdApi(targetId, {
                    commentNumber: issueDetail.commentNumber + 1
                });
                dispatch(updateUserInfoAsync({
                    newInfo: {
                        points: userInfo.points + 4
                    },
                    userId: userInfo._id
                }));
            } else if (commentType === 2) {
                await updateBookApi(targetId, {
                    commentNumber: bookDetail.commentNumber + 1
                });
                dispatch(updateUserInfoAsync({
                    newInfo: {
                        points: userInfo.points + 4
                    },
                    userId: userInfo._id
                }));
            }
        } else {
            message.warning(msg);
        }
    }

    const comment =
        <Comment
            avatar={<Avatar src={userInfo?.avatar} size="large" icon={<UserOutlined/>}/>}
            content={
                <>
                    <Form.Item>
                        <Editor
                            ref={editorRef}
                            initialValue=""
                            previewStyle="vertical"
                            height="270px"
                            initialEditType="wysiwyg"
                            useCommandShortcut={true}
                            language='zh-CN'
                            className="editor"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            disabled={!isLogin}
                            onClick={handleSubmit}
                        >添加评论</Button>
                    </Form.Item>
                </>
            }
        />

    const list = commentList.length > 0 &&
        <List
            header="当前评论"
            dataSource={commentList}
            renderItem={item => (
                <Comment
                    avatar={<Avatar src={item.userInfo.avatar}/>}
                    content={
                        <div dangerouslySetInnerHTML={{__html: item.commentContent}}></div>
                    }
                    datetime={
                        <Tooltip title={formatDate(item.commentDate, 'year')}>
                            <span>{formatDate(item.commentDate, 'year')}</span>
                        </Tooltip>
                    }
                />
            )}
        />

    const pagination = commentList.length > 0 ?
        <div className="paginationContainer">
            <Pagination
                {...params}
                showTotal={(total, range) => `第 ${range[0]}-${range[1]} 项（共 ${total} 项）`}
                defaultCurrent={1}
                pageSizeOptions={['10', '15', '20']}
                showSizeChanger
                showQuickJumper
                onChange={onChange}
            />
        </div>
        :
        null;

    return (
        <div>
            {/* 评论框 */}
            {comment}
            {/* 评论列表 */}
            {list}
            {/* 分页 */}
            {pagination}
        </div>
    );
}

export default Discuss;