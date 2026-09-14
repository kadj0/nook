package com.nook.api.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nook.api.model.Listing;
import com.nook.api.service.ListingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController 
@RequestMapping ("/api/listings")
public class ListingController {
    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping
    public List<Listing> fetchAllListings() {
        return listingService.fetchAllListings();
    }

    @GetMapping("/{id}")
    public Listing fetchListingById(@PathVariable Long id) {
        return listingService.fetchListingById(id);
    }
}
