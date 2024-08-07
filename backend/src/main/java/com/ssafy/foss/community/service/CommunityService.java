package com.ssafy.foss.community.service;

import com.ssafy.foss.community.domain.Post;
import com.ssafy.foss.community.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    // 모든 게시물 조회
    public List<Post> getAllPosts() {
        return communityRepository.findAll();
    }

    // 페이지별 게시물 조회
    public Page<Post> getPostsByPage(int page, int size) {
        // 클라이언트 페이지 번호는 1부터 시작하므로, 서버 측에서는 0부터 시작하는 페이지 번호로 변환
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "regDate")); // 날짜 기준 내림차순 정렬
        return communityRepository.findAll(pageable);
    }

    // 특정 게시물 조회
    public Post getPostById(Long id) {
        return communityRepository.findById(id).orElse(null);
    }

    // 게시물 생성
    public Post createPost(Post post) {
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
    public boolean deletePost(Long id) {
        if (communityRepository.existsById(id)) {
            communityRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
