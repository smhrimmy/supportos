package com.supportos.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByTenantSlug(String tenantSlug);
    Optional<Customer> findByTenantSlugAndId(String tenantSlug, Long id);
    Optional<Customer> findByTenantSlugAndEmail(String tenantSlug, String email);
}
