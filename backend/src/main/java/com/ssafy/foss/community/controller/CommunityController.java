package com.ssafy.foss.community.controller;

import com.ssafy.foss.community.dto.Post;
import com.ssafy.foss.community.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    // 모든 게시물 조회
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = communityService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // 특정 게시물 조회
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = communityService.getPostById(id);
        if (post != null) {
            System.out.println(post);
            return ResponseEntity.ok(post);
        } else {
            System.out.println(post);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 게시물 생성
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post createdPost = communityService.createPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    // 게시물 수정
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post post) {
        Post updatedPost = communityService.updatePost(id, post);
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 게시물 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        if (communityService.deletePost(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
