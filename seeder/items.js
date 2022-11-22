const itemService = require("../services/itemService");

const items = [
  {
    name: "Juan Carlos Notebook",
    model: "MacBook Pro Apple M1",
    brand: "Apple",
    userId: 1,
    categoryId: 1,
    officeId: 2,
  },
  {
    name: "Juan Carlos keyboard",
    model: "Magic QWERTY bluetooth",
    brand: "Apple",
    userId: 1,
    categoryId: 1,
    officeId: 2,
  },
  {
    name: "Juana Notebook",
    model: "MacBook Pro Apple M1",
    brand: "Apple",
    userId: 2,
    categoryId: 1,
    officeId: 1,
  },
  {
    name: "Juana computer chair",
    model: "DevChair 876",
    brand: "SuperChairs",
    userId: 2,
    categoryId: 3,
    officeId: 1,
  },
  {
    name: "Nicolas Notebook",
    model: "MacBook Pro Apple M1",
    brand: "Apple",
    userId: 3,
    categoryId: 1,
    officeId: 4,
  },
  {
    name: "Mabel keyboard",
    model: "Magic QWERTY",
    brand: "Apple",
    userId: 4,
    categoryId: 1,
    officeId: 3,
  },
  {
    name: "Keyboard sin dueño",
    model: "Magic QWERTY",
    brand: "Apple",
    userId: null,
    categoryId: 1,
    officeId: 3,
  },
  {
    name: "Notebook sin dueño",
    model: "MacBook Pro Apple M1",
    brand: "Apple",
    userId: null,
    categoryId: 1,
    officeId: 4,
  },
  {
    name: "Keyboard sin dueño",
    model: "Magic QWERTY",
    brand: "Apple",
    userId: null,
    categoryId: 1,
    officeId: 4,
  },
];

async function createItems() {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    await itemService.createItem(item);
  }
  console.log("ITEMS created");
}

module.exports = createItems;
