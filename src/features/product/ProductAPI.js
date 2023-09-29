export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: Change this server
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter) {
  // filter = { "category" : "Smartphone" }
  let queryString = ""; // This will go after the ?

  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    // TODO: Change this server
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
