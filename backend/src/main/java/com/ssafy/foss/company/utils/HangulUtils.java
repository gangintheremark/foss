package com.ssafy.foss.company.utils;

public class HangulUtils {
    private static final char[] CHO_SUNG = {
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };

    // 초성 추출하기
    public static String extractInitials(String word) {
        StringBuilder initials = new StringBuilder();
        for (char ch : word.toCharArray()) {
            if (ch >= 0xAC00 && ch <= 0xD7A3) {
                int unicode = ch - 0xAC00;
                int cho = unicode / (21 * 28);
                initials.append(CHO_SUNG[cho]);
            } else {
                initials.append(ch);
            }
        }
        return initials.toString();
    }

}
