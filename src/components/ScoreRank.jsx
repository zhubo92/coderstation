import React, {useEffect, useState} from 'react';
import {getUserByPointRankApi} from "../api/user";
import {Card, message} from "antd";
import ScoreItem from "./ScoreItem";

/**
 * 积分排名
 */
function ScoreRank() {
    const [list, setList] = useState([])

    useEffect(() => {
        async function fetchData() {
            const {code,msg, data} = await getUserByPointRankApi();
            if(code === 0) {
                setList(data);
            } else {
                message.warning(msg);
            }
        }
        fetchData();
    }, []);

    const scoreList = list.map((item, index) => (
        <ScoreItem item={item} rank={index + 1} key={item._id}/>
    ))

    return (
        <Card title="积分排行榜" style={{marginTop: '30px'}}>
            {scoreList}
        </Card>
    );
}

export default ScoreRank;