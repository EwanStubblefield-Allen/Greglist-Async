import { AppState } from "../AppState.js"

export class House {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator || 'Anonymous'
    this.year = data.year
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.price = data.price
    this.description = data.description || 'None'
    this.imgUrl = data.imgUrl
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  get houseTemplate() {
    return `
    <div id="${this.id}" class="col-10 m-auto my-3">
      <section class="row bg-light elevation-5 rounded" data-bs-toggle="collapse">
        <div class="col-12 col-md-4 p-0">
          <img class="img-fluid card-img rounded"
            src=${this.imgUrl}
            alt="${this.description}">
        </div>
        <div class="col-12 col-md-8 p-3">
          <h2>Posted By: ${this.creator.name}</h2>
          <h3>$${this.price}</h3>
          <div class="d-flex justify-content-end align-items-center">
            ${this.EditBtn}
            ${this.DeleteBtn}
          </div>
        </div>
        <div class="col-12">
          <div class="collapse" id="${this.id}Collapse">
            <section class="row">
              <div class="col-6">
                <p>Number of Bedrooms: ${this.bedrooms}</p>
                <p>Number of Bathrooms: ${this.bathrooms}</p>
              </div>
              <div class="col-6">
                <h4>Description</h4>
                <p>${this.description}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>`
  }

  get EditBtn() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `<i onclick="app.HousesController.drawUpdate('${this.id}')" class="mdi mdi-update fs-5"></i>`
  }

  get DeleteBtn() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `<i onclick="app.HousesController.deleteHouses('${this.id}')" class="fa fa-trash fs-5 p-3"></i>`
  }

  get updateFormTemplate() {
    return `
    <form onsubmit="app.HousesController.updateHouses(event, '${this.id}')">
      <div class="form-group py-2">
        <input type="url" class="form-control" id="houseImg" aria-describedby="houseImg"
          value="${this.imgUrl}" maxlength="300" required name="imgUrl">
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="houseBeds" aria-describedby="houseBeds"
            value="${this.bedrooms}" required name="bedrooms">
        </div>
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="houseBaths" aria-describedby="houseBaths"
            value="${this.bathrooms}" step=".5" required name="bathrooms">
        </div>
      </div>
      <div class="row justify-content-center py-2">
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="houseYear" aria-describedby="houseYear"
            value="${this.year}" required name="year">
        </div>
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="houseLevels" aria-describedby="houseLevels"
            value="${this.levels}" required name="levels">
        </div>
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="housePrice" aria-describedby="housePrice"
            value="${this.price}" required name="price">
        </div>
      </div>
      <div class="d-flex flex-column align-items-center form-group">
        <label for="houseDescription">House Description</label>
        <textarea name="houseDescription" id="houseDescription" cols="50" rows="5" name="description">
          ${this.description}
        </textarea>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>`
  }

  static get formTemplate() {
    return `
    <form onsubmit="app.HousesController.createHouses(event)">
      <div class="form-group py-2">
        <input type="url" class="form-control" id="houseImg" aria-describedby="houseImg"
          placeholder="House Image" maxlength="300" required name="imgUrl">
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="houseBeds" aria-describedby="houseBeds"
            placeholder="Number of Bedrooms" min="1" max="10" required name="bedrooms">
        </div>
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="houseBaths" aria-describedby="houseBaths"
            placeholder="Number of Bathrooms" min="1" max="10" step=".5" required name="bathrooms">
        </div>
      </div>
      <div class="row justify-content-center py-2">
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="houseYear" aria-describedby="houseYear"
            placeholder="Year Built" min="1900" max="2023" required name="year">
        </div>
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="houseLevels" aria-describedby="houseLevels"
            placeholder="Number of Levels" min="1" max="10000" required name="levels">
        </div>
        <div class="col-12 col-md-3 form-group">
          <input type="number" class="form-control" id="housePrice" aria-describedby="housePrice"
            placeholder="Price" min="1" max="100000000" required name="price">
        </div>
      </div>
      <div class="d-flex flex-column align-items-center form-group">
        <label for="houseDescription">House Description</label>
        <textarea name="houseDescription" id="houseDescription" cols="50" rows="5" name="description"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`
  }
}