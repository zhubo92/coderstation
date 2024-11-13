import React, {useEffect, useState} from 'react';
import styles from '../style/IssueItem.module.css';
import {formatDate} from "../utils/tools";
import {useDispatch, useSelector} from "react-redux";
import {getTypeListAsync} from "../redux/typeSlice";
import {message, Tag} from "antd";
import {getUserInfoByIdApi} from "../api/user";
import {useNavigate} from "react-router-dom";

const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];

/**
 * 每一项的问答
 */
function IssueItem({item}) {
    const dispatch = useDispatch();
    const {typeList} = useSelector(state => state.type);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if(typeList.length === 0) {
            dispatch(getTypeListAsync());
        }
    }, [dispatch, typeList]);

    useEffect(() => {
        async function fetchData() {
            const {data, code, msg} = await getUserInfoByIdApi(item.userId);
            if(code === 0) setUserInfo(data);
            else message.warning(msg);
        }
        fetchData();
    }, [item.userId]);


    const type = typeList.find(t => t._id === item.typeId);

    return (
        <div className={styles.container} onClick={() => navigate(`/issues/${item._id}`)}>
            {/* 回答数 */}
            <div className={styles.issueNum}>
                <div>{item.commentNumber}</div>
                <div>回答</div>
            </div>
            {/* 浏览数 */}
            <div className={styles.issueNum}>
                <div>{item.scanNumber}</div>
                <div>浏览</div>
            </div>
            {/* 问题内容 */}
            <div className={styles.issueContainer}>
                <div className={styles.top}>{item.issueTitle}</div>
                <div className={styles.bottom}>
                    <div>
                        <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>
                            {type?.typeName}
                        </Tag>
                    </div>
                    <div className={styles.right}>
                        <Tag color="volcano">{userInfo?.nickname}</Tag>
                        <span>{formatDate(item.issueDate, 'year')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueItem;