package com.supportos.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByTenantSlugOrderByCreatedAtDesc(String tenantSlug);
    Optional<Ticket> findByTenantSlugAndId(String tenantSlug, Long id);
    Optional<Ticket> findByTenantSlugAndTicketNumber(String tenantSlug, String ticketNumber);
    List<Ticket> findByTenantSlugAndChannel(String tenantSlug, Channel channel);
    List<Ticket> findByTenantSlugAndStatus(String tenantSlug, TicketStatus status);
    List<Ticket> findByTenantSlugAndPriority(String tenantSlug, TicketPriority priority);
    List<Ticket> findByTenantSlugAndCustomerId(String tenantSlug, Long customerId);
}
