package com.nook.api.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
import com.nook.api.model.WatchlistItem;

// @Repository 
public interface WatchlistItemRepository extends JpaRepository<WatchlistItem, Long> {
    List<WatchlistItem> findByUserReferenceOrderByCreatedAtDesc(String userReference);

    Optional<WatchlistItem> findByListingIdAndUserReference(Long listingId, String userReference);

    void deleteByListingIdAndUserReference(Long listingId, String userReference);
}
