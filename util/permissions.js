/* eslint-disable node/no-unpublished-require */
const fs = require('fs');
const botConf = require('../bot.json');
const config = JSON.parse(fs.readFileSync('./config.json'));

const devPermOverwrite = botConf.devPermOverwrite;

class Permissions {
    static entwickler(user) {
        if (devPermOverwrite) return true;
        // Dev, PL, *
        if (user.roles.cache.has(config.roleIds.Dev) || user.roles.cache.has(config.roleIds.PL) || user.roles.cache.has(config.roleIds.stern)) return true;
        else return false;
    }
    static support(user) {
        if (devPermOverwrite) return true;
        // supporter, mod, PL, Dev
        if (user.roles.cache.has(config.roleIds.stern) || user.roles.cache.has(config.roleIds.Dev) || user.roles.cache.has(config.roleIds.Mod) || user.roles.cache.has(config.roleIds.Co_Mod) || user.roles.cache.has(config.roleIds.Sup) || user.roles.cache.has(config.roleIds.Co_Sup)) return true;
        else return false;
    }

    static allTeam(user) {
        if (devPermOverwrite) return true;
        if (
            user.roles.cache.has(config.roleIds.stern) ||
            user.roles.cache.has(config.roleIds.PL) ||
            user.roles.cache.has(config.roleIds.Dev) ||
            user.roles.cache.has(config.roleIds.Gamedesign) ||
            user.roles.cache.has(config.roleIds.Modding_Mapping) ||
            user.roles.cache.has(config.roleIds.Mod) ||
            user.roles.cache.has(config.roleIds.Co_Mod) ||
            user.roles.cache.has(config.roleIds.möchtegern_Mod) ||
            user.roles.cache.has(config.roleIds.Sup) ||
            user.roles.cache.has(config.roleIds.Co_Sup) ||
            user.roles.cache.has(config.roleIds.möchtegern_Sup) ||
            user.roles.cache.has(config.roleIds.Team)
        )
            return true;
        else return false;
    }

    // No Trail
    static FullTeamMember(user) {
        if (devPermOverwrite) return true;
        if (
            user.roles.cache.has(config.roleIds.stern) ||
            user.roles.cache.has(config.roleIds.PL) ||
            user.roles.cache.has(config.roleIds.Dev) ||
            user.roles.cache.has(config.roleIds.Gamedesign) ||
            user.roles.cache.has(config.roleIds.Modding_Mapping) ||
            user.roles.cache.has(config.roleIds.Mod) ||
            user.roles.cache.has(config.roleIds.Co_Mod) ||
            user.roles.cache.has(config.roleIds.Sup) ||
            user.roles.cache.has(config.roleIds.Co_Sup)
        )
            return true;
        else return false;
    }
}

module.exports = {
    Permissions: Permissions,
};
