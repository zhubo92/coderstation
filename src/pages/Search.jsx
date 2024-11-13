import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import styles from '../style/Search.module.css'
import PageHeader from "../components/PageHeader";
import AddIssue from "../components/AddIssue";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import {getIssueByPageApi} from "../api/issue";
import {getBookByPageApi} from "../api/book";
import {message} from "antd";
import SearchItem from "../components/SearchItem";
import MyPagination from "../components/MyPagination";

/**
 * 搜索
 */
function Search() {
    const {state} = useLocation();
    const [params, setParams] = useState({
        current: 1,
        pageSize: 15
    });
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const {value, currentOption} = state;
            const p = {...params};
            let request = getIssueByPageApi;
            if(currentOption === 'issues') {
                p.issueTitle = value;
                p.issueStatus = true;
                request = getIssueByPageApi;
            } else if(currentOption === 'books') {
                p.bookTitle = value;
                request = getBookByPageApi;
            }

            const {data, msg, code} = await request(p);
            if(code === 0) {
                setList(data.data);
                setTotal(data.count);
            } else {
                message.warning(msg);
            }
        }
        if(state) fetchData();
    }, [state, params]);

    const List = list.map(item => (
        <SearchItem item={item} key={item._id} type={state.currentOption} />
    ));

    function onChange(current, pageSize) {
        setParams({
            current,
            pageSize
        })
    }

    return (
        <div className="container">
            <PageHeader title="搜索结果"/>
            <div className={styles.searchPageContainer}>
                {/* 左边 */}
                <div className={styles.leftSide}>
                    {List}
                    <MyPagination list={list} params={params} total={total} onChange={onChange} />
                </div>
                {/* 右边 */}
                <div className={styles.rightSide}>
                    <AddIssue/>
                    <Recommend/>
                    <ScoreRank/>
                </div>
            </div>
        </div>
    );
}

export default Search;