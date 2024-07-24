package com.ssafy.foss.oauth2.user;

import java.util.Map;

public abstract class OAuth2UserInfo {
    protected String socialId;
    protected String email;
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes, String userNameAttributeName) {
        this.socialId = String.valueOf(attributes.get(userNameAttributeName));
        this.email = (String) attributes.get("email");
        this.attributes = attributes;
    }

    public abstract String getSocialId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getProfileImage();

}

