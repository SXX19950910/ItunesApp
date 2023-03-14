import request from '@/utils/request'


export function getRecommendList (params) {
    return request({
        url: '/rss/topgrossingapplications/limit=10/json',
        method: 'get',
        params
    })
}

export function getList () {
    return request({
        url: '/rss/topfreeapplications/limit=100/json',
        method: 'get'
    })
}