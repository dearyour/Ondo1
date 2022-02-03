package com.nextlevel.ondo.repository;

import com.nextlevel.ondo.domain.Challenge;
import com.nextlevel.ondo.domain.ChallengeParticipate;
import com.nextlevel.ondo.domain.Comment;
import com.nextlevel.ondo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findByCommentId(Long commentId);
    Optional<Long> deleteByCommentId(Long commentId);
    Optional<List<Comment>> findAllByFeedId(Long feedId);

}
