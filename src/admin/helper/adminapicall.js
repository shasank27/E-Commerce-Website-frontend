import { API } from "../../backend";

//category calls
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

//getallcategories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

//product calls
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

//getallproducts
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

//getaproduct
export const getaProduct = productid => {
  return fetch(`${API}/product/${productid}`, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

//update a product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${userId}/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

//delete a product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${userId}/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
