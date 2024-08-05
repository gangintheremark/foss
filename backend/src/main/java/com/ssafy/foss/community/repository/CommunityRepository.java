package com.ssafy.foss.community.repository;

import com.ssafy.foss.community.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends JpaRepository<Post, Long> {
}
