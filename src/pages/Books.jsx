import React, {useEffect, useState} from 'react';
import {Card, Pagination} from "antd"
import PageHeader from "../components/PageHeader"
import TypeSelect from "../components/TypeSelect"
import {getBookByPageApi} from '../api/book'
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import styles from "../style/Books.module.css";

const {Meta} = Card;

/**
 * 书籍
 */
function Books() {
    const [bookInfo, setBookInfo] = useState([]);
    const [params, setParams] = useState({
        current: 1,
        pageSize: 15
    });
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const {bookTypeId} = useSelector(state => state.type);

    useEffect(() => {
        const p = {
            current: 1,
            pageSize: 15
        }
        if(bookTypeId !== 'all') p.typeId = bookTypeId;
        setParams(p);
    }, [bookTypeId]);

    useEffect(() => {
        async function fetchData() {
            const {data} = await getBookByPageApi(params);
            setBookInfo(data.data);
            setTotal(data.count);
        }

        fetchData();
    }, [params]);

    function handlePageChange(current, pageSize) {
        setParams({
            current,
            pageSize,
        });
    }

    const bookData = [];
    if (bookInfo.length) {
        for (let i = 0; i < bookInfo.length; i++) {
            bookData.push(
                <Card
                    hoverable
                    style={{
                        width: 200,
                        marginBottom: 30
                    }}
                    cover={<img alt="example" style={{
                        width: 160,
                        height: 200,
                        margin: 'auto',
                        marginTop: 10
                    }} src={bookInfo[i]?.bookPic}/>}
                    key={i}
                    onClick={() => navigate(`/books/${bookInfo[i]._id}`)}
                >
                    <Meta title={bookInfo[i]?.bookTitle}/>
                    <div className={styles.numberContainer}>
                        <div>浏览数：{bookInfo[i]?.scanNumber}</div>
                        <div>评论数：{bookInfo[i]?.commentNumber}</div>
                    </div>
                </Card>);
        }
        if (bookInfo.length % 5 !== 0) {
            var blank = 5 - bookInfo.length % 5;
            for (let i = 1; i <= blank; i++) {
                bookData.push(<div style={{width: 220, marginBottom: 20}} key={i * Math.random()}></div>)
            }
        }
    }

    return (
        <div>
            <PageHeader title="最新书籍">
                <TypeSelect/>
            </PageHeader>
            <div className={styles.bookContainer}>
                {bookData}
            </div>
            <div className="paginationContainer">
                {
                    bookData.length > 0 ? (
                        <Pagination
                            showQuickJumper
                            defaultCurrent={1}
                            {...params}
                            total={total}
                            onChange={handlePageChange}
                        />
                    ) : (
                        <div style={{
                            fontSize: "26px",
                            fontWeight: "200"
                        }}>该分类下暂无书籍</div>
                    )
                }

            </div>
        </div>
    );
}

export default Books;