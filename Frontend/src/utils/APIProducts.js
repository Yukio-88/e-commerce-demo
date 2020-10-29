import axios from "axios";


const PRODUCT_API_BASE_URL = 'http://localhost:8080/products';

/*
export default axios.create({
  baseURL: "http://localhost:3000/api/",
  responseType: "json"
});
*/

class ProductApiService {
    // recupera prodotti
    fetchProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

    // recupera x categoria
    fetchProductsByCategory(categoria) {
        return axios.get(PRODUCT_API_BASE_URL + "/synth", categoria);
    }

    //tabella     
    checkListProduct() {
        return axios.post(PRODUCT_API_BASE_URL + "/listProducts" );
    }
    //recupera tramite id prodotto
    fetchProductById(productId) {
        return axios.get(PRODUCT_API_BASE_URL + '/' + productId);
    }
    //aggiungi prodotto
    addProduct(product) {
        return axios.post(""+PRODUCT_API_BASE_URL, product);
    }
    //modifica prodotto
    editProduct(product) {
        return axios.put(PRODUCT_API_BASE_URL + '/' + product.id, product);
    }
    // cancella prodotto
    deleteProduct(productId) {
        return axios.delete(PRODUCT_API_BASE_URL + '/' + productId);
    }
   
    
    
}

export default new ProductApiService();
