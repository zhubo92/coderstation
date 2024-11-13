import React from 'react';

function PageFooter() {
    return (
        <div className="footer">
            <p className="links">
                <span className="linkItem">友情链接：</span>
                <a
                    href="https://zhubo92.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    朱波的网站
                </a>
                <a
                    href="https://blog.zhubo92.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    朱波的博客
                </a>
            </p>
            <p>© 2024 - Coder Station</p>
            <p>Powered by Create React App</p>
        </div>
    );
}

export default PageFooter;