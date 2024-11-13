import React from 'react';
import styles from "../style/Issue.module.css";
import {Pagination} from "antd";

function MyPagination({list, total, params, onChange}) {
    return (
        <div>
            {
                list.length > 0 ?
                    <div className="paginationContainer">
                        <Pagination
                            {...params}
                            total={total}
                            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 项（共 ${total} 项）`}
                            defaultCurrent={1}
                            pageSizeOptions={['5', '10', '15', '20']}
                            showSizeChanger
                            showQuickJumper
                            onChange={onChange}
                        />
                    </div>
                    :
                    <div className={styles.noIssue}>有问题，就来 coder station！</div>
            }
        </div>
    );
}

export default MyPagination;