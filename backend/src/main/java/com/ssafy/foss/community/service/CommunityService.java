package com.ssafy.foss.community.service;

import com.ssafy.foss.community.domain.Post;
import com.ssafy.foss.community.dto.PostResponse;
import com.ssafy.foss.community.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

//    // 페이지별 게시물 조회
//    public Page<Post> getPostsByPage(int page, int size) {
//        // 클라이언트 페이지 번호는 1부터 시작하므로, 서버 측에서는 0부터 시작하는 페이지 번호로 변환
//        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "regDate")); // 날짜 기준 내림차순 정렬
//        return communityRepository.findAll(pageable);
//    }

    // 키워드로 게시물 검색
    public Page<Post> searchPostsByKeyword(String keyword, int page, int size) {
        // 클라이언트 페이지 번호는 1부터 시작하므로, 서버 측에서는 0부터 시작하는 페이지 번호로 변환
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "regDate")); // 날짜 기준 내림차순 정렬
        return communityRepository.findByKeyword(keyword, pageable);
    }

    // 특정 게시물 조회
    public PostResponse getPostById(Long postId, Long memberId) {
        Post post = communityRepository.findById(postId).orElse(null);
        if(post == null) return null;

        boolean isOwner = post.getMemberId().equals(memberId);

        PostResponse postResponse = PostResponse.builder()
                .postId(post.getPostId())
                .memberId(post.getMemberId())
                .title(post.getTitle())
                .content(post.getContent())
                .writer(post.getWriter())
                .regDate(post.getRegDate())
                .isOwner(isOwner)
                .build();

        return postResponse;
    }

    // 게시물 생성
    public Post createPost(Post post, Long memberId, String writer) {
        post.setMemberId(memberId);
        post.setWriter(writer);
        return communityRepository.save(post);
    }

    // 게시물 수정
    public Post updatePost(Long id, Post postDetails) {
        Optional<Post> existingPost = communityRepository.findById(id);
        if (existingPost.isPresent()) {
            Post post = existingPost.get();
            post.setTitle(postDetails.getTitle());
            post.setContent(postDetails.getContent());
            // 'writer' 필드는 제거하거나 교체해야 할 수도 있음
            // post.setWriter(postDetails.getWriter());
            return communityRepository.save(post);
        }
        return null;
    }

    // 게시물 삭제
    @Transactional
    public boolean deletePost(Long id) {
        int deletedCount = communityRepository.deletePostByIdIfExists(id);
        return deletedCount > 0; // 삭제된 엔티티의 수가 0보다 크면 삭제 성공
    }
}
