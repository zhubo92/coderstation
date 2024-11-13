import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInterviewTitleAsync} from "../redux/interviewSlice";
import {getTypeListAsync} from "../redux/typeSlice";
import PageHeader from "../components/PageHeader";
import {message, Tree} from "antd";
import {getInterviewByIdApi} from "../api/interview";
import styles from '../style/Interview.module.css';

/**
 * 面试题
 */
function Interviews() {
    const {interviewTitleList} = useSelector(state => state.interview);
    const {typeList} = useSelector(state => state.type);
    const dispatch = useDispatch();
    const [detail, setDetail] = useState({});

    useEffect(() => {
        if (interviewTitleList.length === 0) dispatch(getInterviewTitleAsync());
        if (typeList.length === 0) dispatch(getTypeListAsync());
    }, [interviewTitleList, typeList, dispatch]);

    async function handleClick(id) {
        const {code, msg, data} = await getInterviewByIdApi(id);
        if (code === 0) {
            setDetail(data);
        } else {
            message.warning(msg);
        }
    }

    const treeData =
        typeList.length > 0 &&
        interviewTitleList.length > 0 &&
        typeList.map((type, typeIndex) => {
            const children = interviewTitleList[typeIndex].map((interview, interviewIndex) => {
                return {
                    title: <h4 onClick={() => handleClick(interview._id)}>{interview.interviewTitle}</h4>,
                    key: `${typeIndex}-${interviewIndex}`
                }
            });

            return {
                title: <h3 onClick={() => handleClick(type._id)}>{type.typeName}</h3>,
                key: typeIndex,
                children
            }
        });

    let right = null;
    if (detail) {
        right =
            <div className={styles.content}>
                <h1 className={styles.interviewRightTitle}>{detail?.interviewTitle}</h1>
                <div className={styles.contentContainer}>
                    <div dangerouslySetInnerHTML={{__html: detail?.interviewContent}}></div>
                </div>
            </div>;
    } else {
        right = <div style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "100",
            marginTop: "150px"
        }}>
            请在左侧选择面试题
        </div>;
    }

    return (
        <div className="container">
            <PageHeader title="面试题大全"/>
            <div className={styles.interviewContainer}>
                <div className={styles.leftSide}>
                    <Tree
                        treeData={treeData}
                    />
                </div>
                <div className={styles.rightSide}>{right}</div>
            </div>
        </div>
    );
}

export default Interviews;