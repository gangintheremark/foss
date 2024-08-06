package com.ssafy.foss.community.controller;

import com.ssafy.foss.community.domain.Post;
import com.ssafy.foss.community.dto.PostResponse;
import com.ssafy.foss.community.service.CommunityService;
import com.ssafy.foss.member.domain.PrincipalDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;

@CrossOrigin
@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

//    // 게시물 전체 조회
//    @GetMapping
//    public ResponseEntity<Page<Post>> getAllPosts(
//            @RequestParam(value = "page", defaultValue = "1") int page,
//            @RequestParam(value = "size", defaultValue = "10") int size) {
//
//        Page<Post> postPage = communityService.getPostsByPage(page, size);
//
//        return ResponseEntity.ok(postPage);
//    }

    // 게시물 검색
    @GetMapping
    public ResponseEntity<Page<Post>> searchPosts(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Page<Post> postPage = communityService.searchPostsByKeyword(keyword, page, size);

        return ResponseEntity.ok(postPage);
    }

    // 특정 게시물 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id, @AuthenticationPrincipal PrincipalDetail principalDetail) {

        Long memberId = principalDetail.getId();

        PostResponse postResponse = communityService.getPostById(id, memberId);

        if (postResponse != null) {
            return ResponseEntity.ok(postResponse);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 게시물 생성
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post, @AuthenticationPrincipal PrincipalDetail principalDetail) {

        Long memberId = principalDetail.getId();
        String memberName = principalDetail.getMember().getName();

        Post createdPost = communityService.createPost(post, memberId, memberName);

        if (createdPost != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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
