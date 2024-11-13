import request from './request';

/**
 * 问答相关接口
 */

// 获取列表
export function getIssueByPageApi(params) {
    return request({
        url: '/api/issue',
        method: 'GET',
        params
    })
}

// 新增问答
export function addIssueApi(data) {
    return request({
        url: '/api/issue',
        method: 'POST',
        data
    })
}

// 获取问答详情
export function getIssueByIdApi(id) {
    return request({
        url: `/api/issue/${id}`,
        method: 'GET'
    })
}

// 更新问答
export function updateIssueByIdApi(id, data) {
    return request({
        url: `/api/issue/${id}`,
        method: 'PATCH',
        data
    })
}