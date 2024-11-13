import React from 'react';
import styles from "../style/PersonalInfoItem.module.css"

function PersonalInfoItem({title, value}) {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.left}>
                <div>{title}：</div>
                <div>{value}</div>
            </div>
        </div>
    );
}

export default PersonalInfoItem;