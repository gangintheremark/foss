package com.ssafy.foss.community.controller;

import com.ssafy.foss.community.domain.Post;
import com.ssafy.foss.community.dto.PostResponse;
import com.ssafy.foss.community.service.CommunityService;
import com.ssafy.foss.jwt.utils.JwtUtils;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.domain.PrincipalDetail;
import com.ssafy.foss.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;

@CrossOrigin
@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @Autowired
    private MemberService memberService;

    // 페이지네이션을 적용한 게시물 조회
    @GetMapping
    public ResponseEntity<Page<Post>> getAllPosts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        Page<Post> postPage = communityService.getPostsByPage(page, size);
        return ResponseEntity.ok(postPage);
    }

    // 특정 게시물 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        try {
            // Authorization 헤더에서 토큰 추출
            String token = JwtUtils.getTokenFromHeader(authHeader);

            // 토큰 유효성 검증
            JwtUtils.validateToken(token);

            // 토큰에서 Authentication 객체 가져오기
            Authentication authentication = JwtUtils.getAuthentication(token);

            // PrincipalDetail에서 Member 객체 얻기
            PrincipalDetail principalDetail = (PrincipalDetail) authentication.getPrincipal();
            Member member = principalDetail.getMember();

            // Member 객체에서 식별자(ID) 추출
            Long memberId = member.getId();

            Post post = communityService.getPostById(id);

            if (post != null) {
                boolean isOwner = post.getMemberId().equals(memberId);

                // PostResponse DTO 생성
                PostResponse postResponse = PostResponse.builder()
                        .postId(post.getPostId())
                        .memberId(post.getMemberId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .writer(post.getWriter())
                        .regDate(post.getRegDate())
                        .isOwner(isOwner)
                        .build();

                return ResponseEntity.ok(postResponse);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

        } catch (Exception e) {
            // 토큰이 유효하지 않거나 다른 예외가 발생한 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    // 게시물 생성
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post, @RequestHeader("Authorization") String authHeader) {
        try {
            // Authorization 헤더에서 토큰 추출
            String token = JwtUtils.getTokenFromHeader(authHeader);

            // 토큰 유효성 검증
            JwtUtils.validateToken(token);

            // 토큰에서 Authentication 객체 가져오기
            Authentication authentication = JwtUtils.getAuthentication(token);

            // PrincipalDetail에서 Member 객체 얻기
            PrincipalDetail principalDetail = (PrincipalDetail) authentication.getPrincipal();
            Member member = principalDetail.getMember();

            // Member 객체에서 식별자(ID) 추출
            Long memberId = member.getId();
            String memberName = member.getName();

            // 게시물 생성
            post.setMemberId(memberId);
            post.setWriter(memberName);

            Post createdPost = communityService.createPost(post);
            if (createdPost != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            // 토큰이 유효하지 않거나 다른 예외가 발생한 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
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
