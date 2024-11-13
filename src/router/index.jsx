import {Route, Routes, Navigate} from "react-router-dom";
import {Button, Result} from "antd";
import Issues from '../pages/Issues';
import Books from '../pages/Books';
import Interviews from '../pages/Interviews';
import AddIssue from "../pages/AddIssue";
import IssueDetail from "../pages/IssueDetail";
import BookDetail from "../pages/BookDetail";
import Search from "../pages/Search";
import PersonalCenter from "../pages/PersonalCenter";
import Test from "../pages/Test";

// 路由表
const routes = [
    { path: "/", element: <Navigate replace to="/issues"/>, needLogin: false },
    { path: "/issues", element: <Issues/>, needLogin: false },
    { path: "/issues/:id", element: <IssueDetail/>, needLogin: false },
    { path: "/books", element: <Books/>, needLogin: false },
    { path: "/books/:id", element: <BookDetail/>, needLogin: false },
    { path: "/interviews", element: <Interviews/>, needLogin: false },
    { path: "/personalCenter", element: <PersonalCenter/>, needLogin: true },
    { path: "/addIssue", element: <AddIssue/>, needLogin: true },
    { path: "/search", element: <Search/>, needLogin: false },
    { path: "/test", element: <Test/>, needLogin: false },
];

function _403() {
    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <Result
                status="403"
                title="403"
                subTitle="抱歉，您无权访问此页面。请先登录"
                extra={
                    <Button
                        type="primary"
                        onClick={() => window.location.pathname = "/"}
                    >回到首页</Button>
                }
            />
        </div>
    )
}

function _404() {
    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <Result
                status="404"
                title="404"
                subTitle="抱歉，您访问的页面不存在。"
                extra={
                    <Button
                        type="primary"
                        onClick={() => window.location.pathname = "/"}
                    >回到首页</Button>
                }
            />
        </div>
    )
}

function RouteConfig() {
    const currentRoutes = routes.filter(route => route.path === window.location.pathname);
    // 如果路由不存在，应该返回404页面
    if (currentRoutes.length === 0) {
        return <_404/>;
    }

    const currentRoute = currentRoutes[0];
    // 路由需要登录，但是没有登录的话，无权限访问，返回403页面
    if (currentRoute.needLogin && !localStorage.getItem('userToken') && !sessionStorage.getItem('userToken')) {
        return <_403/>;
    }

    return (
        <Routes>
            {routes.map(route => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    );
}

export default RouteConfig;
