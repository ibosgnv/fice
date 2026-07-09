package com.ibos.fice.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/membres/{membreId}/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository repo;

    @GetMapping
    public List<Notification> getAll(@PathVariable Long membreId) {
        return repo.findByMembreIdOrderByCreatedAtDesc(membreId);
    }

    @GetMapping("/count")
    public Map<String, Long> countUnread(@PathVariable Long membreId) {
        return Map.of("unread", repo.countByMembreIdAndLueFalse(membreId));
    }

    @PatchMapping("/{id}/lue")
    public void markAsRead(@PathVariable Long membreId, @PathVariable Long id) {
        repo.findById(id).ifPresent(n -> {
            n.setLue(true);
            repo.save(n);
        });
    }

    @PatchMapping("/lues")
    public void markAllRead(@PathVariable Long membreId) {
        repo.findByMembreIdOrderByCreatedAtDesc(membreId).forEach(n -> {
            n.setLue(true);
            repo.save(n);
        });
    }
}
