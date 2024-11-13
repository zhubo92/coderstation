import request from './request';

/**
 * 用户相关的 api 都放在这里
 */

// 获取验证码
export function getCaptchaApi() {
    return request({
        url: "/res/captcha",
        method: "GET"
    })
}

// 验证用户名是否重复
export function userIsExistApi(loginId) {
    return request({
        url: `/api/user/userIsExist/${loginId}`,
        method: "GET"
    })
}

export function addUserApi(data) {
    return request({
        url: `/api/user`,
        method: "POST",
        data
    })
}

export function userLoginApi(data) {
    return request({
        url: `/api/user/login`,
        method: "POST",
        data
    })
}

// 获取用户信息
export function getUserInfoByIdApi(id) {
    return request({
        url: `/api/user/${id}`,
        method: "GET"
    })
}

// 恢复登录状态
export function getInfoApi() {
    return request({
        url: `/api/user/whoami`,
        method: "GET"
    })
}

// 获取积分前十的用户
export function getUserByPointRankApi() {
    return request({
        url: "/api/user/pointsrank",
        method: "GET"
    })
}

// 修改用户
export function updateUserByIdApi(id, data) {
    return request({
        url: `/api/user/${id}`,
        method: "PATCH",
        data
    })
}

// 根据用户 id 确认密码是否正确
export function checkPasswordIsRightApi(userId, loginPwd) {
    return request("/api/user/passwordcheck", {
        method: "POST",
        data: {
            userId,
            loginPwd,
        },
    });
}