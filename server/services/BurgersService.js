import { burgers } from "../db/FakeDb.js";
import { BadRequest } from "../utils/Errors.js";

class BurgersService {

    getBurgers() {
        return burgers
    }

    getBurgerById(burgerId) {
        const foundBurger = burgers.find(b => b.id == burgerId)

        if (!foundBurger) {
            throw new BadRequest(`${burgerId} is not a valid Id`)
        }

        return foundBurger
    }

    createBurger(burgerData) {
        burgerData.id = burgers.length++

        burgers.push(burgerData)

        return burgerData
    }

    removeBurger(burgerId) {
        const foundIndex = burgers.findIndex(b => b.id == burgerId)

        if (foundIndex < 0) {
            throw new BadRequest(`${burgerId} was not a valid Id`)
        }

        burgers.splice(foundIndex, 1)
    }

    updateBurger(burgerId, burgerData) {
        let originalBurger = this.getBurgerById(burgerId)

        originalBurger.name = burgerData.name || originalBurger.name

        originalBurger.price = burgerData.price || originalBurger.price

        originalBurger.toppings = burgerData.toppings || originalBurger.toppings

        return originalBurger
    }
}

export const burgersService = new BurgersService()



