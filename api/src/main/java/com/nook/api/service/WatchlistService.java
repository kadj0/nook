package com.nook.api.service;

import com.nook.api.dto.CreateWatchlistItemRequest;
import com.nook.api.model.Listing;
import com.nook.api.model.WatchlistItem;
import com.nook.api.repository.WatchlistItemRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class WatchlistService {

    private static final String DEFAULT_USER_REFERENCE = "demo-user";

    private final WatchlistItemRepository watchlistItemRepository;
    private final ListingService listingService;

    public WatchlistService(
            WatchlistItemRepository watchlistItemRepository,
            ListingService listingService) {
        this.watchlistItemRepository = watchlistItemRepository;
        this.listingService = listingService;
    }

    public List<WatchlistItem> fetchWatchlist(String userReference) {
        return watchlistItemRepository.findByUserReferenceOrderByCreatedAtDesc(
                normaliseUserReference(userReference));
    }

    public List<Long> fetchWatchlistListingIds(String userReference) {
        return fetchWatchlist(userReference).stream()
                .map((item) -> item.getListing().getId())
                .toList();
    }

    public WatchlistItem createWatchlistItem(CreateWatchlistItemRequest request) {
        if (request.getListingId() == null) {
            throw new IllegalArgumentException("Listing id is required.");
        }

        String userReference = normaliseUserReference(request.getUserReference());

        return watchlistItemRepository
                .findByListingIdAndUserReference(request.getListingId(), userReference)
                .orElseGet(() -> saveWatchlistItem(request.getListingId(), userReference));
    }

    @Transactional
    public void deleteWatchlistItem(Long listingId, String userReference) {
        watchlistItemRepository.deleteByListingIdAndUserReference(
                listingId,
                normaliseUserReference(userReference));
    }

    private WatchlistItem saveWatchlistItem(Long listingId, String userReference) {
        Listing listing = listingService.fetchListingById(listingId);

        WatchlistItem watchlistItem = new WatchlistItem();
        watchlistItem.setListing(listing);
        watchlistItem.setUserReference(userReference);

        return watchlistItemRepository.save(watchlistItem);
    }

    private String normaliseUserReference(String userReference) {
        if (userReference == null || userReference.isBlank()) {
            return DEFAULT_USER_REFERENCE;
        }

        return userReference.trim();
    }
}
