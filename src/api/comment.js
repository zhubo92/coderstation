import request from './request';

/**
 * 评论相关接口
 */

// 获取某个问答的评论
export function getIssueCommentByIdApi(id, params) {
    return request({
        url: `/api/comment/issuecomment/${id}`,
        method: "GET",
        params
    })
}

// 提交评论
export function addCommentApi(data) {
    return request({
        url: `/api/comment`,
        method: "POST",
        data
    })
}

/**
 * 根据 bookId 获取该书籍所对应的评论
 * @param {*} id
 * @param {*} params
 * @returns
 */
export function getBookCommentByIdApi(id, params) {
    return request(`/api/comment/bookcomment/${id}`, {
        method: "GET",
        params,
    });
}