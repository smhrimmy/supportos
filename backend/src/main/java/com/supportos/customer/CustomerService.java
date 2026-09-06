package com.supportos.customer;

import com.supportos.tenant.TenantContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerOrderRepository orderRepository;
    private final TimelineEventRepository timelineRepository;

    public CustomerService(CustomerRepository customerRepository,
                           CustomerOrderRepository orderRepository,
                           TimelineEventRepository timelineRepository) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.timelineRepository = timelineRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findByTenantSlug(TenantContext.getTenant());
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findByTenantSlugAndId(TenantContext.getTenant(), id);
    }

    public List<CustomerOrder> getCustomerOrders(Long customerId) {
        return orderRepository.findByTenantSlugAndCustomerIdOrderByCreatedAtDesc(TenantContext.getTenant(), customerId);
    }

    public List<TimelineEvent> getCustomerTimeline(Long customerId) {
        return timelineRepository.findByTenantSlugAndCustomerIdOrderByOccurredAtDesc(TenantContext.getTenant(), customerId);
    }

    public Customer createCustomer(Customer customer) {
        customer.setTenantSlug(TenantContext.getTenant());
        return customerRepository.save(customer);
    }
}
