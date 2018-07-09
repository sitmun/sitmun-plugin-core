package org.sitmun.plugin.core.security;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private UserDetailsService userDetailsService;
	private PasswordEncoder passwordEncoder;
	private final TokenProvider tokenProvider;

	public WebSecurity(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder,
			TokenProvider tokenProvider,AuthenticationManagerBuilder authenticationManagerBuilder) {
		super();
		this.authenticationManagerBuilder = authenticationManagerBuilder;
		this.userDetailsService = userDetailsService;
		this.passwordEncoder = passwordEncoder;
		this.tokenProvider = tokenProvider;
	}

	@Override
	@SuppressWarnings("squid:S4502")
	protected void configure(HttpSecurity http) throws Exception {
		http
				.addFilterBefore(corsFilter(), UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling()
				.authenticationEntryPoint(getRestAuthenticationEntryPoint())
				//.accessDeniedHandler(problemSupport)
			.and()

				.csrf()
				.disable()
				.headers()
				.frameOptions()
				.disable()
			.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
				.authorizeRequests()
				.antMatchers("/api/authenticate").permitAll()
				.antMatchers(HttpMethod.POST, "/api/users").permitAll()
				.antMatchers("/api/**").authenticated()
			.and()
				.apply(securityConfigurerAdapter());
	}

	@Bean
	public CorsFilter corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
		return new CorsFilter(source);
	}

	private JWTConfigurer securityConfigurerAdapter() {
		return new JWTConfigurer(tokenProvider);
	}
	
	private AuthenticationEntryPoint getRestAuthenticationEntryPoint() {
        return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);
    }

	@PostConstruct
	public void init() {
		try {
			authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
		} catch (Exception e) {
			throw new BeanInitializationException("Security configuration failed", e);
		}
	}

}