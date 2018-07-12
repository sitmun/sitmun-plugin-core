package org.sitmun.plugin.core.security;

import java.io.Serializable;
import java.util.Optional;

import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("permissionEvaluator")
@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CustomPermissionEvaluator implements PermissionEvaluator {

	@Autowired
	private UserService userService;
	
	
	@Override
	public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {

		if ((authentication == null) || (targetDomainObject == null) || !(permission instanceof String)) {
			return false;
		}
		Optional<User> currentUser = this.userService.getUserWithPermissionsByUsername(((org.springframework.security.core.userdetails.User)authentication.getPrincipal()).getUsername());
		if (currentUser.isPresent()) {
			User user = currentUser.get();
			if (targetDomainObject instanceof User) {
				return userService.resolvePermission(user, ((User) targetDomainObject),
						permission.toString());
			}

			return true;
		} else

		{
			return false;
		}
		
		
		
	}

	@Override
	public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
			Object permission) {
		if ((authentication == null) || (targetType == null) || !(permission instanceof String)) {
			return false;
		}
		
		Optional<User> currentUser = this.userService.getUserWithPermissionsByUsername(authentication.getName());

		if (currentUser.isPresent()) {
			User user = currentUser.get();

			if (targetType.equalsIgnoreCase(User.class.getName())) {

				// llamar a método correspondiente del servicio vinculado??
				Optional<User> targetDomainObjectOptional = userService.findUser((Long) targetId);
				if (targetDomainObjectOptional.isPresent()) {
					return userService.resolvePermission(user, targetDomainObjectOptional.get(),
							permission.toString());
				} else {
					return false;
				}

			}

			return true;
		} else

		{
			return false;
		}
				
		 
		

	}

}
