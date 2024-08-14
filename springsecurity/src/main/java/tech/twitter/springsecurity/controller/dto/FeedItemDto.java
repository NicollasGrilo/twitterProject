package tech.twitter.springsecurity.controller.dto;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

public record FeedItemDto(Long tweetId, String content, String username) {
}
