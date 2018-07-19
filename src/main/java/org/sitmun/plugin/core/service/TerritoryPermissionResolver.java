package org.sitmun.plugin.core.service;

import org.sitmun.plugin.core.security.AuthoritiesConstants;
import org.sitmun.plugin.core.security.PermissionResolver;
import org.sitmun.plugin.core.security.SecurityConstants;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

import org.sitmun.plugin.core.domain.Territory;
import org.sitmun.plugin.core.domain.User;
import org.sitmun.plugin.core.domain.UserConfiguration;

@Component
public class TerritoryPermissionResolver implements PermissionResolver<Territory> {

	@Override
	public boolean resolvePermission(User authUser, Territory entity, String permission) {
		Set<UserConfiguration> permissions = authUser.getPermissions();
		boolean isAdminSitmun = permissions.stream()
				.anyMatch(p -> p.getRole().getName().equalsIgnoreCase(AuthoritiesConstants.ADMIN_SITMUN));
		boolean isAdminOrganization = permissions.stream()
				.anyMatch(p -> p.getRole().getName().equalsIgnoreCase(AuthoritiesConstants.ADMIN_ORGANIZACION));

		if (isAdminSitmun)
			return true;

		if (permission.equalsIgnoreCase(SecurityConstants.UPDATE_PERMISSION)
				|| permission.equalsIgnoreCase(SecurityConstants.CREATE_PERMISSION)
				|| permission.equalsIgnoreCase(SecurityConstants.DELETE_PERMISSION)
				|| permission.equalsIgnoreCase(SecurityConstants.ADMIN_PERMISSION)) {

			// si tengo el rol de admin de territorio
			if (isAdminOrganization) {
				if (entity.getId()!=0) {
					return permissions.stream()
						.filter(p -> p.getRole().getName().equalsIgnoreCase(AuthoritiesConstants.ADMIN_ORGANIZACION))
						.map(UserConfiguration::getTerritory).map(Territory::getId).collect(Collectors.toList())
						.contains(entity.getId());
				} else {
					// cannot create new territories
					return false;
				}
			} else {
				return false;
			}
		} else if (permission.equalsIgnoreCase(SecurityConstants.READ_PERMISSION)) {
			// Si tengo permisos sobre ese territorio
			//return permissions.stream().map(UserConfiguration::getTerritory).map(Territory::getId).collect(Collectors.toList()).contains(entity.getId()) ;
			return true;

		}

		return false;
		
	}

}
