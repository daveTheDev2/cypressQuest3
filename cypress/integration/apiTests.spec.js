const params = require("../fixtures/data.json")

describe('Taste Dive API tests ', () => {
  it('Should get an object Similar with good properties ', () => {
    cy.request('https://tastedive.com/api/similar')
        .then(response => {    
            expect(response.body).is.an('object')
            expect(response.body).to.have.property('Similar')
            expect(response.body.Similar).to.have.property('Results')
            .with.an("Array")
            expect(response.body.Similar).to.have.property('Info')
            expect(response.body.Similar.Info[0]).to.have.property('Name')
            expect(response.body.Similar.Info[1]).to.have.property('Type')
         })
       })
  it('Should have a Results with type = movie ', () => {
    cy.SimilarRequest(params[0])
        .then(response => {            
              expect(response.body.Similar.Results[1].Type).to.eql("movie")
          })
      })

  it('Should have a Results with type = music ', () => {
    cy.SimilarRequest(params[1])
        .then(response => {            
              expect(response.body.Similar.Results[1].Type).to.eql("music")
          })
      })
})
