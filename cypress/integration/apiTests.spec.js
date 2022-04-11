const params = require("../fixtures/data.json");

describe("Taste Dive API tests ", () => {
  it("Should get an object Similar with good properties ", () => {
    cy.request("https://tastedive.com/api/similar").then((response) => {
      expect(response.status).to.be.eq(200);
      expect(response.body).is.an("object");
      expect(response.body).to.have.property("Similar");
      expect(response.body.Similar)
        .to.have.property("Results")
        .with.an("Array");
      expect(response.body.Similar).to.have.property("Info");
      expect(response.body.Similar.Info[0]).to.have.property("Name");
      expect(response.body.Similar.Info[1]).to.have.property("Type");
    });
  });

  it("Should get an object Similar with good properties with loop ", () => {
    cy.request("https://tastedive.com/api/similar").then((response) => {
      for (let i = 0; i > params.length; i++)
        expect(response.status).to.be.eq(200);
      expect(response.body).is.an("object");
    });
  });

  it("Should have a Results with type=movie and limit=2", () => {
    cy.SimilarRequest2(params[0].Name, params[0].Type, params[0].limit).then(
      (response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body.Similar.Results.length).to.be.eq(2);
        expect(response.body.Similar.Results[1].Type).to.eql("movie");
      }
    );
  });

  it("Should have a Results with type=music and limit=2", () => {
    cy.SimilarRequest2(params[1].Name, params[1].Type, params[1].limit).then(
      (response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body.Similar.Results.length).to.be.eq(5);
        expect(response.body.Similar.Results[2].Type).to.eql("music");
      }
    );
  });
});
