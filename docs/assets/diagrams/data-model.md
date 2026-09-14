@startuml
title Nook - Data Model Diagram

skinparam linetype ortho
skinparam nodesep 90
skinparam ranksep 90
hide methods
hide stereotypes

left to right direction

entity "listings" as listings {
  * id : BIGINT <<PK>>
  --
  source_url : VARCHAR(500)
  property_type : VARCHAR(50)
  furnished : VARCHAR(50)
  bedrooms : INT
  bathrooms : INT
  size_sqm : DECIMAL
  price_per_month : DECIMAL
  original_price : DECIMAL
  deposit : DECIMAL
  listed_at : DATE
  description : TEXT
  area : VARCHAR(100)
  street : VARCHAR(255)
  borough : VARCHAR(100)
  postcode : VARCHAR(20)
  nearest_station : VARCHAR(150)
  crime_score : DECIMAL
  energy_rating : VARCHAR(5)
  internet_speed_mbps : INT
  created_at : DATETIME
}

entity "listing_images" as listing_images {
  * id : BIGINT <<PK>>
  --
  listing_id : BIGINT <<FK>>
  image_url : VARCHAR(500)
  is_hero : BOOLEAN
  display_order : INT
}

entity "watchlist_items" as watchlist_items {
  * id : BIGINT <<PK>>
  --
  listing_id : BIGINT <<FK>>
  user_reference : VARCHAR(100)
  created_at : DATETIME
}

entity "listing_notes" as listing_notes {
  * id : BIGINT <<PK>>
  --
  listing_id : BIGINT <<FK>>
  user_reference : VARCHAR(100)
  note : TEXT
  status : VARCHAR(50)
  created_at : DATETIME
  updated_at : DATETIME
}

entity "price_history" as price_history {
  * id : BIGINT <<PK>>
  --
  listing_id : BIGINT <<FK>>
  price_per_month : DECIMAL
  recorded_at : DATETIME
}

listings ||--o{ listing_images
listings ||--o{ watchlist_items
listings ||--o{ listing_notes
listings ||--o{ price_history

note right of watchlist_items
Uses user_reference = "demo-user"
for the local assessment demo.
end note

note right of listing_notes
Notes are validated by the API
and attached directly to listings.
end note

@enduml
