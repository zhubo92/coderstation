import React from 'react';
import { Image } from "antd"

import styles from "../style/BookItem.module.css";
import {useNavigate} from "react-router-dom";

function BookItem({item}) {
    const navigate = useNavigate();
    const reg = /<[^<>]+>/g;
    const bookIntro = item.bookIntro.replace(reg,"");

    return (
        <div className={styles.container}>
            {/* 评论数 */}
            <div className={styles.bookNum}>
                <div>{item.commentNumber}</div>
                <div>评论</div>
            </div>
            {/* 浏览数 */}
            <div className={styles.bookNum}>
                <div>{item.scanNumber}</div>
                <div>浏览</div>
            </div>
            {/* 书籍内容 */}
            <div className={styles.bookContainer}>
                {/* 左边图片 */}
                <div className={styles.left}>
                    <Image className={styles.bookPic} src={item.bookPic} />
                </div>
                {/* 右侧分为上下 */}
                <div className={styles.right}>
                    <div className={styles.top} onClick={() => navigate(`/book/${item._id}`)}>{item.bookTitle}</div>
                    <div className={styles.bottom}>{bookIntro.slice(0,55) + "..."}</div>
                </div>
            </div>
        </div>
    );
}

export default BookItem;