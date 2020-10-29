package com.valhalla.Midgard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.valhalla.Midgard.model.Product;

import com.valhalla.Midgard.repository.ProductRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/products")

public class ProductController {
	
	@Autowired
	ProductRepository productRepository;
	
	// salva prodotto
	@PostMapping
    public @ResponseBody Product saveProduct(@RequestBody Product product){
		
		System.out.println("stampo il prodotto in arrivo " + product);
		
		Product pd = productRepository.save(product);

		System.out.println("stampo il prodotto in uscita " + pd);
		
		return pd;
    }
	
	
	
	//recupera prodotto tramite id
	@GetMapping("/{id}")
    public @ResponseBody Product getProduct(@PathVariable int id) {
		
		System.out.println("recupero prodotto " + productRepository.findById(id).get());
		
		return productRepository.findById(id).get();
        
    }
	

	
	//modifica prodotto//
	
	@PutMapping("/{id}")
    public @ResponseBody Product productEdit (@RequestBody Product product ,@PathVariable int id) {
		
		
		System.out.println("Stampo il prodotto " + product);
		
		Product p = productRepository.save(product);
		   
							
		//System.out.println("Stampo l' utente 2" + u);	
		 
		return p;
    }
	
	//creo la lista dei prodotti
	@PostMapping(value = "/listProducts")
    public @ResponseBody List<Product> tabellaProdotti ( ) {

		 List<Product> listProduct = (List<Product>) productRepository.findAll();
		
		System.out.println("Stampo la lista " + listProduct.toString());
		 
		 return listProduct;
    }
	@PostMapping(value = "/synth")
    public @ResponseBody List<Product> categoriaProdotti ( @RequestBody Product product  ) {

		 List<Product> catProduct = (List<Product>) productRepository.findByCategoria(product.getCategoria());
		
		System.out.println("Stampo la lista " + catProduct.toString());
		 
		 return catProduct;
    }
	@PostMapping(value = "/marca")
    public @ResponseBody List<Product> marcaProdotti ( @RequestBody Product product  ) {

		 List<Product> marcaProduct = (List<Product>) productRepository.findByMarca(product.getMarca());
		
		System.out.println("Stampo la lista " + marcaProduct.toString());
		 
		 return marcaProduct;
    }
	
	@DeleteMapping("/{id}")
    public @ResponseBody void deleteProduct (@PathVariable int id) {
		
		

		productRepository.deleteById(id);
		
							
	 }

}
