@startuml
title Nook - Backend Class Diagram

skinparam classAttributeIconSize 0
skinparam linetype ortho
skinparam nodesep 80
skinparam ranksep 80
hide empty methods

left to right direction

package "Controller Layer" {
  class ListingController <<controller>> {
    + fetchAllListings()
    + fetchListingById(id)
  }

  class WatchlistController <<controller>> {
    + fetchWatchlist(userReference)
    + fetchWatchlistListingIds(userReference)
    + createWatchlistItem(request)
    + deleteWatchlistItem(listingId, userReference)
  }

  class ListingNoteController <<controller>> {
    + fetchNotesForListing(listingId)
    + createNote(request)
  }
}

package "Service Layer" {
  class ListingService <<service>> {
    + fetchAllListings()
    + fetchListingById(id)
  }

  class WatchlistService <<service>> {
    + fetchWatchlist(userReference)
    + fetchWatchlistListingIds(userReference)
    + createWatchlistItem(request)
    + deleteWatchlistItem(listingId, userReference)
  }

  class ListingNoteService <<service>> {
    + fetchNotesForListing(listingId)
    + createNote(request)
  }
}

package "Repository Layer" {
  interface ListingRepository <<repository>>
  interface WatchlistItemRepository <<repository>>
  interface ListingNoteRepository <<repository>>
}

package "DTOs" {
  class CreateWatchlistItemRequest <<DTO>> {
    - Long listingId
    - String userReference = "demo-user"
  }

  class CreateListingNoteRequest <<DTO>> {
    - Long listingId
    - String userReference = "demo-user"
    - String note
  }
}

package "Domain Model" {
  class Listing <<entity>> {
    - Long id
    - String sourceUrl
    - String propertyType
    - String furnished
    - Integer bedrooms
    - Integer bathrooms
    - BigDecimal sizeSqm
    - BigDecimal pricePerMonth
    - BigDecimal originalPrice
    - BigDecimal deposit
    - LocalDate listedAt
    - String area
    - String street
    - String borough
    - String postcode
    - String nearestStation
    - BigDecimal crimeScore
    - String energyRating
    - Integer internetSpeedMbps
  }

  class ListingImage <<entity>> {
    - Long id
    - String imageUrl
    - Boolean isHero
    - Integer displayOrder
  }

  class WatchlistItem <<entity>> {
    - Long id
    - String userReference
    - LocalDateTime createdAt
  }

  class ListingNote <<entity>> {
    - Long id
    - String userReference
    - String note
    - String status
    - LocalDateTime createdAt
    - LocalDateTime updatedAt
  }

  class PriceHistory <<entity>> {
    - Long id
    - BigDecimal pricePerMonth
    - LocalDateTime recordedAt
  }
}

ListingController --> ListingService
WatchlistController --> WatchlistService
ListingNoteController --> ListingNoteService

ListingService --> ListingRepository
WatchlistService --> WatchlistItemRepository
WatchlistService --> ListingRepository
ListingNoteService --> ListingNoteRepository
ListingNoteService --> ListingRepository

WatchlistController --> CreateWatchlistItemRequest
ListingNoteController --> CreateListingNoteRequest

ListingRepository --> Listing
WatchlistItemRepository --> WatchlistItem
ListingNoteRepository --> ListingNote

Listing "1" --> "0..*" ListingImage : has
Listing "1" --> "0..*" WatchlistItem : saved as
Listing "1" --> "0..*" ListingNote : has
Listing "1" --> "0..*" PriceHistory : tracks

@enduml
