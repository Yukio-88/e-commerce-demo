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

import com.valhalla.Midgard.model.User;
import com.valhalla.Midgard.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")

public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	//salva utente
	@PostMapping
    public @ResponseBody User saveUser(@RequestBody User user){
		
		System.out.println("stampo lo user in arrivo " + user);
		
		userRepository.save(user);

		return user;
    }
	//recupera utente tramite id
	@GetMapping("/{id}")
    public @ResponseBody User getUser(@PathVariable int id) {
		
		System.out.println("recupero lo user " + userRepository.findById(id).get());
		
		return userRepository.findById(id).get();
        
    }
	
	
	//*********//
	
	//accesso
	@PostMapping(value = "/login")
	public @ResponseBody User loginUser(@RequestBody User user ) {
		
		User userCheck = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		
		System.out.println("stampo lo user che recupero " + userCheck);
			
		return userCheck;
	}
	
	
	
	//tabella
	@PostMapping(value = "/listUsers")
    public @ResponseBody List<User> newTabella ( ) {

		 List<User> listUsers = (List<User>) userRepository.findAll();
		
		System.out.println("Stampo la lista " + listUsers.toString());
		 
		 return listUsers;
    }
	//modifica tramite id
	@PutMapping("/{id}")
    public @ResponseBody User newEdit (@RequestBody User user ,@PathVariable int id) {
		
		
		System.out.println("Stampo l' utente " + user);
		System.out.println("Stampo l' id" + id);
		User u = userRepository.save(user);
		   
							
		//System.out.println("Stampo l' utente 2" + u);	
		 
				return u;
    }
	//cancella tramite id 
	@DeleteMapping("/{id}")
    public @ResponseBody void deleteUser (@PathVariable int id) {
		
		

		userRepository.deleteById(id);
		
							
	 }
	
	
	
	
	
}
