package com.ssafy.foss.oauth2.user;

import java.util.Map;

public abstract class OAuth2UserInfo {
    protected String socialId;
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes, String userNameAttributeName) {
        this.attributes = attributes;
        this.socialId = String.valueOf(attributes.get(userNameAttributeName));
    }

    public abstract String getSocialId();

    public abstract String getName();

    public abstract String getProfileImage();

}

