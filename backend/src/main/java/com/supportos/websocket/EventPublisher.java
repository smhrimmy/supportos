package com.supportos.websocket;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EventPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public EventPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void publishTicketUpdate(Object ticket) {
        messagingTemplate.convertAndSend("/topic/tickets", ticket);
    }

    public void publishMessage(Long ticketId, Object message) {
        messagingTemplate.convertAndSend("/topic/tickets/" + ticketId + "/messages", message);
    }

    public void publishCopilotInsight(Long ticketId, Object insight) {
        messagingTemplate.convertAndSend("/topic/tickets/" + ticketId + "/copilot", insight);
    }

    public void publishNotification(String message, String type) {
        messagingTemplate.convertAndSend("/topic/notifications", Map.of("message", message, "type", type));
    }
}
