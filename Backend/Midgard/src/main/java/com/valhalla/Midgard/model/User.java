package com.valhalla.Midgard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="valhalla_ecommerce")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private String nome, cognome, email, password, img;
	private double conto;
	private boolean ruolo;
	
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getCognome() {
		return cognome;
	}
	
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getImg() {
		return img;
	}
	
	public void setImg(String img) {
		this.img = img;
	}
	
	public double getConto() {
		return conto;
	}
	
	public void setConto(double conto) {
		this.conto = conto;
	}
	
	public boolean isRuolo() {
		return ruolo;
	}
	
	public void setRuolo(boolean ruolo) {
		this.ruolo = ruolo;
	}
	

	@Override
	public String toString() {
		return "User [id=" + id + ", nome=" + nome + ", cognome=" + cognome + ", email=" + email + ", password="
				+ password + ", img=" + img + ", conto=" + conto + ", ruolo=" + ruolo + "]";
	}	

	
	
	

}
