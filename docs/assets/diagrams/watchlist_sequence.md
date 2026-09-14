@startuml
title Add Listing to Watchlist

<style>
sequenceDiagram {
  participant {
    Padding 40
  }
  box {
    Padding 20
  }
}
</style>

actor User
participant "React Frontend" as Frontend
participant "Spring Boot API" as API
database "MySQL" as DB

User -> Frontend: Clicks watchlist button
Frontend -> API: POST /api/watchlist\n{ listingId, userReference }
API -> DB: Find listing by ID
alt Listing exists
  DB --> API: Return listing
  API -> DB: Check existing watchlist item
  alt Already saved
    DB --> API: Existing watchlist item
    API --> Frontend: 201 Created + existing item
  else Not saved
    API -> DB: Insert watchlist item
    DB --> API: Saved watchlist item
    API --> Frontend: 201 Created + watchlist item
  end
  Frontend --> User: Show saved state
else Listing missing
  DB --> API: No listing found
  API --> Frontend: 404 Not Found
  Frontend --> User: Show error message
end

@enduml
