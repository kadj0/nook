package com.nook.api.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.nook.api.model.ListingNote;

@Repository 
public interface ListingNoteRepository extends JpaRepository<ListingNote, Long> {
    List<ListingNote> findByListingIdOrderByCreatedAtDesc(Long listingId);
}
