package org.sitmun.plugin.core.security;

import static org.sitmun.plugin.core.security.SecurityConstants.TOKEN_PREFIX;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class TokenProvider {

	private final Logger log = LoggerFactory.getLogger(TokenProvider.class);

	//private static final String AUTHORITIES_KEY = "auth";

	@Value("${security.authentication.jwt.secret}")
	private String secretKey;
	@Value("${security.authentication.jwt.token-validity-in-miliseconds}")
	private long tokenValidityInMilliseconds;

	public String getSecretKey() {
		return secretKey;
	}

	public long getTokenValidityInMilliseconds() {
		return tokenValidityInMilliseconds;
	}

	
/*
	public Authentication getAuthentication(String token) {
		Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
		Collection<? extends GrantedAuthority> authorities = Arrays
				.stream(claims.get(AUTHORITIES_KEY).toString().split(",")).map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());

		User principal = new User(claims.getSubject(), "", authorities);

		return new UsernamePasswordAuthenticationToken(principal, token, authorities);
	}
	*/

	public boolean validateToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			log.info("Invalid JWT signature.");
			log.trace("Invalid JWT signature trace: {}", e);
		} catch (MalformedJwtException e) {
			log.info("Invalid JWT token.");
			log.trace("Invalid JWT token trace: {}", e);
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT token.");
			log.trace("Expired JWT token trace: {}", e);
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT token.");
			log.trace("Unsupported JWT token trace: {}", e);
		} catch (IllegalArgumentException e) {
			log.info("JWT token compact of handler are invalid.");
			log.trace("JWT token compact of handler are invalid trace: {}", e);
		}
		return false;
	}

	public String createToken(String username) {
		long now = (new Date()).getTime();
		Date validity;
		validity = new Date(now + this.tokenValidityInMilliseconds);

		return Jwts.builder().setSubject(username)
				.signWith(SignatureAlgorithm.HS512, secretKey.getBytes()).setExpiration(validity).compact();
	}

	public String getUserFromToken(String token) {
		 return Jwts.parser()
         .setSigningKey(secretKey.getBytes())
         .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
         .getBody()
         .getSubject();
	}
}
