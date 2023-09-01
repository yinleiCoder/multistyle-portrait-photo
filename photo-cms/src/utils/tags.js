const whiteList = ['/login', '/404']

export function isTags(path) {
    return !whiteList.includes(path)
}