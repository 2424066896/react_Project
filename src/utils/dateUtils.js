export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

export const srcc ='https://dss1.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/weather/icons/a0.png'