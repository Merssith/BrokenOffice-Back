const axios = require("axios");
const { expect } = require("chai");
const { faker } = require("@faker-js/faker");
const { Done } = require("@mui/icons-material");

describe("Users", async () => {
  it("should be able to login user", async () => {
    const email = "admin@1.com";
    const password = "HolaHola2022!";
    const res = await axios
      .post("http://localhost:3001/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => res.data);
    expect(res.name).equal("Juan carlos");
  });

  it("should be able get user list", async () => {
    let cookie = await login();
    const res = await axios
      .get("http://localhost:3001/api/users/all?page=1", {
        headers: { Cookie: cookie },
        withCredentials: true,
      })
      .then((res) => res.data);
    expect(res.totalPages).equal(3);
    expect(res.totalUsers).equal(22);
  });

  it("should be able create users", async () => {
    const userName = faker.name.firstName();
    const userLastName = faker.name.lastName();
    const res = await axios
      .post("http://localhost:3001/api/users", {
        name: userName,
        lastName: userLastName,
        email: userName + "@1.com",
        password: "HolaHola2022",
        geoCords: { lat: -37.3278607, lng: -59.1338698 },
      })
      .then((res) => res.data);
    expect(res.name).equal(userName);
    expect(res.lastName).equal(userLastName);
  });
});

describe("Incidents", async () => {
  it("should be able get incident list", async () => {
    let cookie = await login();
    const res = await axios
      .get("http://localhost:3001/api/incidents/all", {
        headers: { Cookie: cookie },
        withCredentials: true,
      })
      .then((res) => res.data);
    expect(res.totalIncidents).equal(22);
  });

  it("should be able create incidents", async () => {
    let cookie = await login();
    const res = await axios
      .post(
        "http://localhost:3001/api/incidents",
        {
          status: "OPEN",
          place: "Buenos Aires, Argentina",
          subject: "Incident report #003",
          geoCords: { lat: -37.3278607, lng: -59.1338698 },
          details: "Incident Details",
          photo:
            "https://res.cloudinary.com/dsdiadotw/image/upload/v1670423772/incidents/inc-ph-c0357c47-7ea8-498c-9448-785a19867aff.jpg",
          userId: 1,
        },
        {
          headers: { Cookie: cookie },
          withCredentials: true,
        }
      )
      .then((res) => res.data);
    expect(res.status).equal("OPEN");
  });
});

async function login() {
  const email = "admin@1.com";
  const password = "HolaHola2022!";
  const loginRes = await axios.post("http://localhost:3001/api/users/login", {
    email: email,
    password: password,
  });
  let cookie = loginRes.headers["set-cookie"][0];
  return cookie;
}
