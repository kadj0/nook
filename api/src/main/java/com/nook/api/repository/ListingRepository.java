package com.nook.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.nook.api.model.Listing;

@Repository 
public interface ListingRepository extends JpaRepository<Listing, Long> {
}