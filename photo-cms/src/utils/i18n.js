import i18n from '@/i18n'

export function genMenui18nTitle(title) {
    return i18n.global.t(`message.route.${title}`)
}