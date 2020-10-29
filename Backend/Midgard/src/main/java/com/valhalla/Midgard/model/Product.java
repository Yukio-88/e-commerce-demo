package com.valhalla.Midgard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="valhalla_ecommerceProducts")
public class Product {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	
	private String nome,descrizione,img,categoria,marca;
	
	private double prezzo;
	private boolean disponibile;
	private int quantita;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public void setMarca(String marca) {
		
		this.marca = marca;
	}
	public String getMarca() {
		
		return marca;
	}
	
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public double getPrezzo() {
		return prezzo;
	}
	public void setPrezzo(double prezzo) {
		this.prezzo = prezzo;
	}
	public boolean isDisponibile() {
		return disponibile;
	}
	public void setDisponibile(boolean disponibile) {
		this.disponibile = disponibile;
	}
	public int getQuantita() {
		return quantita;
	}
	public void setQuantità(int quantita) {
		this.quantita = quantita;
	}

	@Override
	public String toString() {
		return "Product [marca="+marca+",id=" + id + ", nome=" + nome + ", descrizione=" + descrizione + ", img=" + img + ", categoria="
				+ categoria + ", prezzo=" + prezzo + ", disponibile=" + disponibile + ", quantità=" + quantita + "]";
	}
	
	
	
	
}
