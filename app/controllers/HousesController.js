import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawHouses() {
  let template = ''
  AppState.houses.forEach(h => template += h.houseTemplate)
  setHTML('houseCards', template)
}

export class HousesController {
  constructor() {
    console.log('Houses Controller Loaded');

    this.getHouses()
    this.drawForm()

    AppState.on('houses', _drawHouses)
    AppState.on('houses', this.drawForm)
    AppState.on('account', _drawHouses)
  }

  drawForm() {
    setHTML('houseForm', House.formTemplate)
  }

  drawUpdate(id) {
    let foundHouse = AppState.houses.find(h => h.id == id)
    let houseForm = document.getElementById('house')
    setHTML('houseForm', foundHouse.updateFormTemplate)
    bootstrap.Collapse.getOrCreateInstance('#houseCollapse').show()
    houseForm.scrollIntoView()
  }

  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async createHouses(event) {
    try {
      if (!AppState.account) {
        throw new Error('Please sign in to submit!')
      }
      event.preventDefault()
      let form = event.target
      await housesService.createHouses(getFormData(form))
      form.reset()
      bootstrap.Collapse.getOrCreateInstance('#houseCollapse').hide()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async deleteHouses(id) {
    try {
      const doesWant = await Pop.confirm('Are you sure you want to delete this house?')
      if (!doesWant) {
        return
      }
      await housesService.deleteHouses(id)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async updateHouses(event, id) {
    try {
      event.preventDefault()
      let form = event.target
      await housesService.updateHouses(getFormData(form), id)
      bootstrap.Collapse.getOrCreateInstance('#houseCollapse').hide()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}