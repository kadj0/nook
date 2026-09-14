package com.nook.api.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import com.nook.api.dto.CreateListingNoteRequest;
import com.nook.api.service.ListingNoteService;
import org.springframework.http.HttpStatus;
import com.nook.api.model.ListingNote;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ListingNoteController {

    private final ListingNoteService listingNoteService;

    public ListingNoteController(ListingNoteService listingNoteService) {
        this.listingNoteService = listingNoteService;
    }

    @GetMapping("/listings/{listingId}/notes")
    public List<ListingNote> fetchNotesForListing(@PathVariable Long listingId) {
        return listingNoteService.fetchNotesForListing(listingId);
    }

    @PostMapping("/listing-notes")
    @ResponseStatus(HttpStatus.CREATED)
    public ListingNote createNote(@Valid @RequestBody CreateListingNoteRequest request) {
        return listingNoteService.createNote(request);
    }
}
