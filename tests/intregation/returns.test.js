const { Rental } = require("../../models/rental_model");
const mongoose = require("mongoose");
const request = require("supertest");

describe("/api/returns", () => {
  let server;
  let rental;
  let customerId;
  let movieId;

  beforeEach(async () => {
    server = require("../../app");

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "123456",
        phone: "123456",
      },
      movie: {
        _id: movieId,
        title: "123456",
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
  });

  it("should return 401 if client is not logged in", async() => {
    const res = await request(server).post('/api/returns/').send({
        customer : customerId , movie : movieId
    })

    expect(res.status).toBe(401)
  });
});
