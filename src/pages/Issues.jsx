import React, {useEffect, useState} from 'react';
import PageHeader from "../components/PageHeader";
import styles from '../style/Issue.module.css';
import {getIssueByPageApi} from "../api/issue";
import {message} from "antd";
import IssueItem from "../components/IssueItem";
import AddIssue from "../components/AddIssue";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import TypeSelect from "../components/TypeSelect";
import {useSelector} from "react-redux";
import MyPagination from "../components/MyPagination";

/**
 * 问答
 */
function Issues() {
    const [list, setList] = useState([]);
    const [params, setParams] = useState({
        current: 1,
        pageSize: 15,
        issueStatus: true
    });
    const [total, setTotal] = useState(0);
    const {issueTypeId} = useSelector(state => state.type);

    useEffect(() => {
        const p = {
            current: 1,
            pageSize: 15,
            issueStatus: true,
        }
        if(issueTypeId !== 'all') p.typeId = issueTypeId;
        setParams(p);
    }, [issueTypeId]);

    useEffect(() => {
        async function fetchData() {
            const {code, data, msg} = await getIssueByPageApi(params);
            if (code === 0) {
                setList(data.data);
                setTotal(data.count);
            } else {
                message.warning(msg);
            }
        }
        fetchData();
    }, [params]);

    function onChange(current, pageSize) {
        setParams({
            ...params,
            current,
            pageSize
        })
    }

    const IssueList = list.map(item => (
        <IssueItem key={item._id} item={item}/>
    ));

    return (
        <div className={styles.container}>
            <PageHeader title="问答列表">
                <TypeSelect/>
            </PageHeader>
            {/* 下面的列表内容 */}
            <div className={styles.issueContainer}>
                <div className={styles.leftSide}>
                    {IssueList}
                    <MyPagination list={list} params={params} total={total} onChange={onChange} />
                </div>
                <div className={styles.rightSide}>
                    <AddIssue/>
                    <Recommend/>
                    <ScoreRank/>
                </div>
            </div>
        </div>
    );
}

export default Issues;