import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HousesService {
  async getHouses() {
    const res = await api.get('/api/houses')
    AppState.houses = res.data.map(r => new House(r))
    AppState.emit('houses')
  }

  async createHouses(form) {
    const res = await api.post('/api/houses', form)
    const newHouse = new House(res.data)
    AppState.houses.push(newHouse)
    AppState.emit('houses')
  }

  async deleteHouses(id) {
    await api.delete(`/api/houses/${id}`)
    let houses = AppState.houses
    let houseIndex = houses.findIndex(h => h.id == id)
    if (houseIndex == -1) {
      throw new Error('The index does not exist!')
    }
    houses.splice(houseIndex, 1)
    AppState.emit('houses')
  }

  async updateHouses(data, id) {
    const res = await api.put(`/api/houses/${id}`, data)
    let updated = new House(res.data)
    console.log(data)
    let houses = AppState.houses
    let houseIndex = houses.findIndex(h => h.id == id)
    if (houseIndex == -1) {
      throw new Error('The index does not exist!')
    }
    houses.splice(houseIndex, 1, updated)
    AppState.emit('houses')
  }
}

export const housesService = new HousesService()