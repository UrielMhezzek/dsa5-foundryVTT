import DSA5_Utility from "../system/utility-dsa5.js"

export default class Miscast {
    static async getSpellMiscast() {
        let res = await new Roll("2d6").evaluate({ async: true })
        return DSA5_Utility.replaceDies(game.i18n.localize("SPELLMISCAST." + res.total))
    }

    static async getLiturgyMiscast() {
        let res = await new Roll("2d6").evaluate({ async: true })
        return DSA5_Utility.replaceDies(game.i18n.localize("LITURGYMISCAST." + res.total))
    }

    static async showBotchCard(table) {
        let result = await Miscast[`get${table}Miscast`]()
        let title = `${game.i18n.localize("TABLENAMES." + table)}`
        let options = {}
        renderTemplate(`systems/dsa5/templates/tables/tableCard.html`, { result: result, title: title }).then(html => {
            let chatOptions = {
                user: game.user.id,
                content: html,
                whisper: options.whisper,
                blind: options.blind,
            }
            ChatMessage.create(chatOptions)
        })
    }
}