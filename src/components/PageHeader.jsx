import React from 'react';
import styles from '../style/PageHeader.module.css'
/**
 * 页头
 */
function PageHeader({title, children}) {
    return (
        <div className={styles.row}>
            <div className={styles.pageHeader}>{title}</div>
            {/* 分类列表 */}
            {children}
        </div>
    );
}

export default PageHeader;