package com.ssafy.foss.community.dto;

public class Post {
    private Long postId;
    private Long memberId;
    private String title;
    private String content;
    private String writer;
    private String regDate;

    public Post() {
    }

    public Post(Long postId, Long memberId, String title, String content, String writer, String regDate) {
        this.postId = postId;
        this.memberId = memberId;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.regDate = regDate;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }
}
