export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: Change this server
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = { "category" : "Smartphone" }
  // pagination = {_page: 1, _limit=10}
  let queryString = ""; // This will go after the ?

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    // TODO: Change this server
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}