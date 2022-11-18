const itemService = require("../services/itemService");

const items = [
  {
    name: "Juan Carlos Notebook",
    model: "MacBook Pro Apple M1",
    brand: "Apple",
    userId: 1,
  },
  {
    name: "Juan Carlos keyboard",
    model: "Magic QWERTY bluetooth",
    brand: "Apple",
    userId: 1,
  },
  {
    name: "Juana Notebook",
    model: "MacBook Pro Apple M1",
    brand: "Apple",
    userId: 2,
  },
  {
    name: "Juana computer chair",
    model: "DevChair 876",
    brand: "SuperChairs",
    userId: 2,
  },
  {
    name: "Nicolas Notebook",
    model: "MacBook Pro Apple M1",
    brand: "Apple",
    userId: 3,
  },
  {
    name: "Mabel keyboard",
    model: "Magic QWERTY",
    brand: "Apple",
    userId: 4,
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
