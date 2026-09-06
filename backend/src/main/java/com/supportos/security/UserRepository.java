package com.supportos.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByTenantSlugAndEmail(String tenantSlug, String email);
    List<User> findByTenantSlug(String tenantSlug);
}
