package com.ssafy.foss.community.service;

import com.ssafy.foss.community.dto.Post;
import com.ssafy.foss.community.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    // 특정 게시물 조회
    public Post getPostById(Long id) {
        return communityRepository.findById(id).orElse(null);
    }

    // 게시물 생성
    public Post createPost(Post post) {
        if (post.getId() != null && communityRepository.existsById(post.getId())) {
            // 이미 존재하는 게시물 ID일 경우 처리
            return null;
        }
        return communityRepository.save(post);
    }

    // 게시물 수정
    public Post updatePost(Long id, Post postDetails) {
        Optional<Post> existingPost = communityRepository.findById(id);
        if (existingPost.isPresent()) {
            Post post = existingPost.get();
            post.setTitle(postDetails.getTitle());
            post.setContent(postDetails.getContent());
            post.setWriter(postDetails.getWriter());
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
