import request from './request';

/**
 * 获取所有的类型
 */
export function getTypeApi() {
    return request({
        url: "/api/type",
        method: "GET"
    })
}