import { menus } from "../db/OrderDb.js"
import { BadRequest } from "../utils/Errors.js"

class MenusService {

    getMenus() {
        return menus
    }

    getMenuById(menuId) {
        const foundMenu = menus.find(m => m.id == menuId)

        if (!foundMenu) {
            throw new BadRequest(`${menuId} is not a valid Id`)
        }

        return foundMenu
    }

    createMenu(menuData) {
        menuData.id = menus.length++

        menus.push(menuData)

        return menuData
    }

    removeMenu(menuId) {
        const foundIndex = menus.findIndex(m => m.id == menuId)

        if (foundIndex < 0) {
            throw new BadRequest(`${menuId} was not a valid id`)
        }

        menus.splice(foundIndex, 1)
    }

    updateMenu(menuId, menuData) {
        let originalMenu = this.getMenuById(menuId)

        originalMenu.name = menuData.name || originalMenu.name

        originalMenu.needsId = menuData.needsId || originalMenu.needsId

        return originalMenu
    }
}


export const menusService = new MenusService()