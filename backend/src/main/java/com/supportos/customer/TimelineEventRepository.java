package com.supportos.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimelineEventRepository extends JpaRepository<TimelineEvent, Long> {
    List<TimelineEvent> findByTenantSlugAndCustomerIdOrderByOccurredAtDesc(String tenantSlug, Long customerId);
}
