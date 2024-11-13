import request from './request';

// 获取面试所有分类的面试题标题
export function getInterviewTitleApi() {
    return request({
        url: "/api/interview/interviewTitle",
        method: "GET"
    })
}

// 根据id获取面试题
export function getInterviewByIdApi(id) {
    return request({
        url: `/api/interview/${id}`,
        method: "GET"
    })
}