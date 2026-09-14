package com.nook.api.service;
import com.nook.api.model.Listing;
import com.nook.api.repository.ListingRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;


@Service 
public class ListingService {
    private final ListingRepository listingRepository;

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public List<Listing> fetchAllListings() {
        return listingRepository.findAll();
    }

    public Listing fetchListingById(Long id) {
        return listingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("This listing does not exist."));
    }
}