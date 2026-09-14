@startuml
title Search Seeded Listings

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

User -> Frontend: Opens listings page
Frontend -> API: GET /api/listings
API -> DB: SELECT listings with images
DB --> API: Seeded listing records
API --> Frontend: JSON listings
Frontend -> Frontend: Apply filters\nborough, budget, bedrooms,\nproperty type, size
Frontend -> Frontend: Calculate Nook score
Frontend --> User: Display filtered scored cards

alt User opens listing detail
  Frontend -> API: GET /api/listings/{id}
  API -> DB: SELECT listing by ID
  DB --> API: Listing detail
  API --> Frontend: JSON listing detail
  Frontend --> User: Display detail page
end

@enduml
