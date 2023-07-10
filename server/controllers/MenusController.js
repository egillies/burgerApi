import { menusService } from "../services/MenusService.js";
import BaseController from "../utils/BaseController.js";


export class MenusController extends BaseController {
    constructor() {
        super('api/menus')
        this.router
            .get('', this.getMenus)
            .get('/:menuId', this.getMenuById)
            .post('', this.createMenu)
            .delete('/:menuId', this.removeMenu)
            .put('/:menuId', this.updateMenu)
    }

    async getMenus(req, res, next) {
        try {
            const menus = await menusService.getMenus()
        } catch (error) {
            next(error)
        }
    }

    async getMenuById(req, res, next) {
        try {
            const menuId = req.params.menuId

            const menu = await menusService.getMenuById(menuId)

            res.send(menu)

        } catch (error) {
            next(error)
        }
    }

    async createMenu(req, res, next) {
        try {
            const menuData = req.body

            const menu = await menusService.createMenu(menuData)

            res.send(menu)

        } catch (error) {
            next(error)
        }
    }

    async removeMenu(req, res, next) {
        try {
            const menuId = req.params.menuId

            await menusService.removeMenu(menuId)

            res.send('Menu has been deleted')

        } catch (error) {
            next(error)
        }
    }

    async updateMenu(req, res, next) {
        try {
            const menuId = req.params.menuId

            const menuData = req.body

            const updatedMenu = await menusService.updateMenu(menuId, menuData)

            res.send(updatedMenu)

        } catch (error) {
            next(error)
        }
    }
}