import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTypeListAsync, updateBookTypeId, updateIssueTypeId} from "../redux/typeSlice";
import {Tag} from "antd";

const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];

/**
 * 分类组件
 */
function TypeSelect() {
    const {typeList} = useSelector(state => state.type);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeList.length === 0) {
            dispatch(getTypeListAsync());
        }
    }, [typeList]);

    function handleSwitch(id) {
        const {pathname} = window.location;
        if (pathname === '/issues') {
            dispatch(updateIssueTypeId(id));
        } else if (pathname === '/books') {
            dispatch(updateBookTypeId(id));
        }
    }

    let tags = [];

    if (typeList.length > 0) {
        tags.push(
            <Tag
                color="magenta"
                value="all"
                key="all"
                style={{cursor: "pointer"}}
                onClick={() => handleSwitch('all')}
            >全部</Tag>
        )
        typeList.map((item, index) => {
            tags.push(
                <Tag
                    color={colorArr[index % colorArr.length]}
                    value={item._id}
                    key={item._id}
                    style={{cursor: "pointer"}}
                    onClick={() => handleSwitch(item._id)}
                >{item.typeName}</Tag>
            )
        })
    }

    return (
        <div>{tags}</div>
    );
}

export default TypeSelect;