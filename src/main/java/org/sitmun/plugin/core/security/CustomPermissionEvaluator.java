package org.sitmun.plugin.core.security;

import java.io.Serializable;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.service.UserService;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.ResolvableType;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("permissionEvaluator")
@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CustomPermissionEvaluator implements PermissionEvaluator {

	@Autowired
	private UserService userService;

	@Autowired
	private ApplicationContext сontext;

	@PersistenceContext
	private EntityManager em;

	@Override
	public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {

		if ((authentication == null) || (targetDomainObject == null) || !(permission instanceof String)) {
			return false;
		}
		if (!(authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.User))
			return false;

		Optional<User> currentUser = this.userService.getUserWithPermissionsByUsername(
				((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());
		if (currentUser.isPresent()) {
			User user = currentUser.get();
			try {
				String[] beanNamesForType = сontext.getBeanNamesForType(
						ResolvableType.forClassWithGenerics(PermissionResolver.class, targetDomainObject.getClass()));
				if (beanNamesForType.length > 0) {
					PermissionResolver rc = null;
					rc = (PermissionResolver) сontext.getBean(beanNamesForType[0]);
					if (rc != null) {
						return rc.resolvePermission(user, targetDomainObject, (String) permission);
					}
				}
			} catch (BeansException e) {
				e.printStackTrace();
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
		
		System.out.println(authentication.getName());

		if (currentUser.isPresent()) {
			User user = currentUser.get();

			try {
				String[] beanNamesForType = сontext.getBeanNamesForType(
						ResolvableType.forClassWithGenerics(PermissionResolver.class, Class.forName(targetType)));
				if (beanNamesForType.length > 0) {
					PermissionResolver rc = null;
					rc = (PermissionResolver) сontext.getBean(beanNamesForType[0]);
					if (rc != null) {
						return rc.resolvePermission(user,em.find(Class.forName(targetType), targetId), (String) permission);
					}
				}
			} catch (BeansException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return true;
		} else

		{
			System.out.println(authentication.getName()+" not found");
			return false;
		}

	}

}
