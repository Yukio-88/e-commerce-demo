package com.valhalla.Midgard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.valhalla.Midgard.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	
	List<Product> findByCategoria(String categoria);
	List<Product> findByMarca(String marca);
	
	
}