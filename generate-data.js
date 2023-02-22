const faker = require("faker");
const fs = require("fs");

// Set locale to use Vietnamese
faker.locale = "vi";

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.unique(faker.datatype.number),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.unique(faker.datatype.number),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        userId: faker.datatype.number({ min: 1, max: 8 }),
        price: Number.parseFloat(faker.commerce.price()),
        createdAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };

      productList.push(product);
    });
  }

  return productList;
};

function randomUserList(n) {
  if (n <= 0) return [];
  const userList = [];
  Array.from(new Array(n)).forEach((a, b) => {
    const user = {
      name: faker.name.findName(),
      id: b + 1,
      address: faker.address.city(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    };

    userList.push(user);
  });

  return userList;
}

// IFFE
(() => {
  // random data
  const userList = randomUserList(8);
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    users: userList,
  };

  // write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully =))");
  });
})();
