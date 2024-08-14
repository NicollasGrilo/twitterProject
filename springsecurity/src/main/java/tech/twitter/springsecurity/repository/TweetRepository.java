package tech.twitter.springsecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.twitter.springsecurity.model.Tweet;
@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {



}
