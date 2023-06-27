export const HousesView = /*HTML*/`
<div class="container-fluid">
  <section class="row">
    <div id="house" class="col-12 p-4 d-flex">
      <h1>Houses</h1>
      <button class="btn btn-info ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#houseCollapse"
        aria-expanded="false" aria-controls="houseCollapse">
        House Form
      </button>
    </div>
  </section>
  <section class="row">
    <div class="col-10 m-auto">
      <div class="collapse" id="houseCollapse">
        <div id="houseForm" class="card card-body">
          
        </div>
      </div>
    </div>
  </section>

  <section id="houseCards" class="row">
    
  </section>
</div>
`