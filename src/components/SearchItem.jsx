import React from 'react';
import IssueItem from "./IssueItem";
import BookItem from "./BookItem";

/**
 * 搜索结果
 * 根据搜索的类型返回不同的组件 IssueItem bookItem
 * 这种的组件没有自己的 JSX 视图，更像是一个容器，我们称之为容器组件
 */
function SearchItem({item, type}) {
    return (
        <div>
            {type === "issues" ? <IssueItem item={item} /> : <BookItem item={item}/> }
        </div>
    );
}

export default SearchItem;