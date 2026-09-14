package com.nook.api.controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.nook.api.dto.CreateWatchlistItemRequest;
import com.nook.api.service.WatchlistService;
import org.springframework.http.HttpStatus;
import com.nook.api.model.WatchlistItem;
import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping
    public List<WatchlistItem> fetchWatchlist(
            @RequestParam(defaultValue = "demo-user") String userReference) {
        return watchlistService.fetchWatchlist(userReference);
    }

    @GetMapping("/ids")
    public List<Long> fetchWatchlistListingIds(
            @RequestParam(defaultValue = "demo-user") String userReference) {
        return watchlistService.fetchWatchlistListingIds(userReference);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WatchlistItem createWatchlistItem(@RequestBody CreateWatchlistItemRequest request) {
        return watchlistService.createWatchlistItem(request);
    }

    @DeleteMapping("/{listingId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWatchlistItem(
            @PathVariable Long listingId,
            @RequestParam(defaultValue = "demo-user") String userReference) {
        watchlistService.deleteWatchlistItem(listingId, userReference);
    }
}
