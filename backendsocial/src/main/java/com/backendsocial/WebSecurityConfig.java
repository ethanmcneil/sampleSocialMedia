package com.backendsocial;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.*;

import static com.backendsocial.auth.AuthConstants.*;

import java.util.Arrays;

import com.backendsocial.auth.JWTAuthenticationFilter;
import com.backendsocial.auth.JWTAuthorizationFilter;
import com.backendsocial.auth.MySqlUserDetailsService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private MySqlUserDetailsService mySQLUserDetailsService;
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
         .userDetailsService(mySQLUserDetailsService)
         .passwordEncoder(passwordEncoder());
    }
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors()
	      .and()
	      .csrf().disable()
	      .authorizeRequests().antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
	      .anyRequest().authenticated()
	      .and()
	      .addFilter(new JWTAuthenticationFilter(authenticationManager()))
	      .addFilter(new JWTAuthorizationFilter(authenticationManager()))
	      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	  }
	
	@Bean
	  CorsConfigurationSource corsConfigurationSource() {
	    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration corsConfig = new CorsConfiguration();
	    corsConfig.applyPermitDefaultValues();
	    corsConfig.setExposedHeaders(Arrays.asList("Authorization"));
	    corsConfig.addAllowedOrigin("*");
	    corsConfig.addAllowedMethod(HttpMethod.DELETE);
	    corsConfig.addAllowedMethod(HttpMethod.PUT);
	    source.registerCorsConfiguration("/**", corsConfig);
	    return source;
	  }
}

