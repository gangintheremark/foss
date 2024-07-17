package com.ssafy.foss.oauth2.user;

import java.util.Map;

public class NaverUserInfo extends OAuth2UserInfo {

    public NaverUserInfo(Map<String, Object> attributes, String userNameAttributeName) {
        super(attributes, userNameAttributeName);
    }

    @Override
    public String getSocialId() {
        return socialId;
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getProfileImage() {
        return (String) attributes.get("profile_image");
    }
}

