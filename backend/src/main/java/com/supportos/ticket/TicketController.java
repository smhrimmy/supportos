package com.supportos.ticket;

import com.supportos.ai.AiInsight;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getTickets(
            @RequestParam(required = false) Channel channel,
            @RequestParam(required = false) TicketStatus status,
            @RequestParam(required = false) TicketPriority priority
    ) {
        return ResponseEntity.ok(ticketService.getTickets(channel, status, priority));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDto.TicketDetailResponse> getTicketDetail(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicketDetail(id));
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody TicketDto.CreateTicketRequest request) {
        return ResponseEntity.ok(ticketService.createTicket(request));
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<Message> addMessage(@PathVariable Long id, @RequestBody TicketDto.AddMessageRequest request) {
        return ResponseEntity.ok(ticketService.addMessage(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Ticket> updateStatus(@PathVariable Long id, @RequestBody TicketDto.UpdateStatusRequest request) {
        return ResponseEntity.ok(ticketService.updateStatus(id, request.getStatus()));
    }

    @PatchMapping("/{id}/assign")
    public ResponseEntity<Ticket> assignTicket(@PathVariable Long id, @RequestBody TicketDto.AssignTicketRequest request) {
        return ResponseEntity.ok(ticketService.assignTicket(id, request.getAgentId(), request.getAgentName()));
    }

    @GetMapping("/{id}/copilot")
    public ResponseEntity<AiInsight> getTicketCopilot(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicketCopilot(id));
    }
}
