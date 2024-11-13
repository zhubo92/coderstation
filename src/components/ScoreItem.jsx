import React, {useState} from 'react';
import styles from '../style/ScoreItem.module.css';
import {Avatar} from "antd";
import classNames from "classnames";

function ScoreItem({item, rank}) {
    const [classNameCollection] = useState({
        "iconfont": true,
        "icon-jiangbei": true
    })

    let rankNum = null;
    switch (rank) {
        case 1:
            rankNum = <div
                style={{
                    color: '#ffda23',
                    fontSize: '22px'
                }}
                className={classNames(classNameCollection)}
            ></div>
            break;
        case 2:
            rankNum = <div
                style={{
                    color: '#c5c5c5',
                    fontSize: '22px'
                }}
                className={classNames(classNameCollection)}
            ></div>
            break;
        case 3:
            rankNum = <div
                style={{
                    color: '#cd9a62',
                    fontSize: '22px'
                }}
                className={classNames(classNameCollection)}
            ></div>
            break;
        default:
            rankNum = <div className={styles.rank}>{rank}</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                {rankNum}
                <div className={styles.avatar}>
                    <Avatar src={item.avatar} size="small"/>
                </div>
                <div className={styles.nickname}>{item.nickname}</div>
            </div>
            <div className={styles.right}>{item.points}</div>
        </div>
    );
}

export default ScoreItem;