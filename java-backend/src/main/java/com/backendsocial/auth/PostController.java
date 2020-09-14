package com.backendsocial.auth;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path="/post")
public class PostController {
	
	 @Autowired
	 private PostRepository postRepository;
	 
	 @PostMapping(path="/add")
	 public ResponseEntity<Post> addNewPost(@RequestHeader String author, @RequestHeader String message) {
	 Post n = new Post();
	 n.setAuthor(author);
	 n.setMessage(message);
	 n.setTimeStamp(new Timestamp(System.currentTimeMillis()));
	 postRepository.save(n);
	 return ResponseEntity.ok(n);
	 }

	 @GetMapping(path="")
	 public @ResponseBody Iterable<Post> getAllPosts() {
	 return postRepository.findAll();
	 }


	 @PutMapping(path="/{id}")
	 public ResponseEntity<Post> putPost(@PathVariable(value="id") Integer id, @RequestHeader String author, @RequestHeader String message) {
		 Post foundPost = postRepository.findById(id).orElse(null);
	     if(foundPost == null) {
	        return ResponseEntity.notFound().header("Message","Nothing found with that id or you don't have permission").build();
	     }
	    else {
	      	foundPost.setMessage(message);
	        postRepository.save(foundPost);
	        return ResponseEntity.ok(foundPost);	     
	        }
	    }
	  @DeleteMapping(path="/delete")
	  public ResponseEntity<Post> deletePost(@RequestHeader Integer id, @RequestHeader String author) {
	       Post foundPost = postRepository.findById(id).orElse(null);
	        if(foundPost == null) {
	        return ResponseEntity.notFound().header("Message","Nothing found with that id or you don't have permission").build();
	        }
	        else {
	        postRepository.delete(foundPost);
		    return ResponseEntity.ok(foundPost);
	        }

	    }
}
