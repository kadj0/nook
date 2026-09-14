package com.nook.api.service;

import com.nook.api.dto.CreateListingNoteRequest;
import com.nook.api.model.Listing;
import com.nook.api.model.ListingNote;
import com.nook.api.repository.ListingNoteRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ListingNoteService {

    private final ListingNoteRepository listingNoteRepository;
    private final ListingService listingService;

    public ListingNoteService(
            ListingNoteRepository listingNoteRepository,
            ListingService listingService) {
        this.listingNoteRepository = listingNoteRepository;
        this.listingService = listingService;
    }

    public List<ListingNote> fetchNotesForListing(Long listingId) {
        return listingNoteRepository.findByListingIdOrderByCreatedAtDesc(listingId);
    }

    public ListingNote createNote(CreateListingNoteRequest request) {
        if (request.getListingId() == null) {
            throw new IllegalArgumentException("Listing id is required.");
        }

        if (request.getNote() == null || request.getNote().isBlank()) {
            throw new IllegalArgumentException("Note cannot be empty.");
        }

        Listing listing = listingService.fetchListingById(request.getListingId());

        ListingNote listingNote = new ListingNote();
        listingNote.setListing(listing);
        listingNote.setNote(request.getNote().trim());

        if (request.getUserReference() != null && !request.getUserReference().isBlank()) {
            listingNote.setUserReference(request.getUserReference().trim());
        }

        return listingNoteRepository.save(listingNote);
    }
}
