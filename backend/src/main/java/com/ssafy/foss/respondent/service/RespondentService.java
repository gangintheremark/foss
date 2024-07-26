package com.ssafy.foss.respondent.service;

import com.ssafy.foss.interview.domain.Interview;
import com.ssafy.foss.member.domain.Member;
import com.ssafy.foss.member.service.MemberService;
import com.ssafy.foss.respondent.domain.Respondent;
import com.ssafy.foss.respondent.repository.RespondentRepository;
import com.ssafy.foss.schedule.domain.Apply;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class RespondentService {
    private final RespondentRepository respondentRepository;
    private final MemberService memberService;

    @Transactional
    public void create(List<Apply> applies, Interview interview) {
        List<Long> memberIds = applies.stream().map(apply -> apply.getMemberId()).collect(Collectors.toList());

        List<Member> members = memberIds.stream()
                .map(id -> memberService.findById(id))
                .collect(Collectors.toList());

        List<Respondent> respondents = mapToRespondent(applies, interview);

        respondentRepository.saveAll(respondents);
    }

    @NotNull
    private List<Respondent> mapToRespondent(List<Apply> applies, Interview interview) {
        return applies.stream()
                .map(apply -> {
                    Member member = memberService.findById(apply.getMemberId());
                    return Respondent.builder()
                            .member(member)
                            .interview(interview)
                            .fileUrl(apply.getFileUrl()).build();
                }).collect(Collectors.toList());
    }
}
