package com.backendsocial.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

	@RestController
	@RequestMapping(path="/user")
	public class UserController {
	
	@Autowired
	private MySqlUserDetailsService userService;
	
	
	 @PostMapping(path="/register")
	  public void register(@RequestBody User newUser) {
	    userService.Save(newUser);
	  }
	 
	 @GetMapping(path="")
     public ResponseEntity<User> getInfo(@RequestHeader String username) {
		 User foundUser = userService.loadFullUserByUsername(username);
		 return ResponseEntity.ok(foundUser);
	 }

 @PutMapping("/{id}")
   public ResponseEntity<User> putPost(@PathVariable(value="id") Integer id, @RequestHeader String webName) {

       User foundUser = userService.loadUserById(id);
       if(foundUser == null) {
           return ResponseEntity.notFound().header("Message","Nothing found with that id").build();
       }

       else {
    	   foundUser.setWebName(webName);
       	   userService.Update(foundUser);
           return ResponseEntity.ok(foundUser);
       }

   }

   @DeleteMapping("/{id}")
   public ResponseEntity<User> deletePost(@PathVariable(value="id") Integer id) {
      User foundUser = userService.loadUserById(id);
       if(foundUser == null) {
           return ResponseEntity.notFound().header("Message","Nothing found with that id or you don't have permission").build();
       }
       
       else {
    	   userService.Delete(foundUser);
	       return ResponseEntity.ok().build();
       }

   }
  
}
