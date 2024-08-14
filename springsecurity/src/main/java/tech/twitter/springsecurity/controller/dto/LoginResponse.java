package tech.twitter.springsecurity.controller.dto;

public record LoginResponse(String accessToken, Long expiresIn) {
}
