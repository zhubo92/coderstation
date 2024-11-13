import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from '../style/IssueDetail.module.css';
import {getIssueByIdApi} from "../api/issue";
import {Avatar} from "antd";
import PageHeader from "../components/PageHeader";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import {getUserInfoByIdApi} from "../api/user";
import {formatDate} from "../utils/tools";
import Discuss from "../components/Discuss";

/**
 * 问答详情
 */
function IssueDetail() {
    const {id} = useParams();
    const [detail, setDetail] = useState({});
    const [issueUser, setIssueUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            const {data} = await getIssueByIdApi(id);
            setDetail(data);
            const {data: _data} = await getUserInfoByIdApi(data.userId);
            setIssueUser(_data);
        }
        fetchData();
    }, [id]);

    return (
        <div className={styles.container}>
            <PageHeader title="问答详情"/>
            <div className={styles.detailContainer}>
                {/* 左侧 */}
                <div className={styles.leftSide}>
                    <div className={styles.question}>
                        <h1>{detail?.issueTitle}</h1>
                        <div className={styles.questioner}>
                            <Avatar src={issueUser?.avatar} size="small" />
                            <span className={styles.user}>{issueUser?.nickname}</span>
                            <span>发布于：{formatDate(detail?.issueDate)}</span>
                        </div>
                        {/* 问答详情内容 */}
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{ __html: detail.issueContent }}></div>
                        </div>
                    </div>
                    <Discuss commentType={1} targetId={id} issueDetail={detail}/>
                </div>
                {/* 右侧 */}
                <div className={styles.rightSide}>
                    <div style={{ marginBottom: '20px' }}>
                        <Recommend/>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <ScoreRank/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueDetail;