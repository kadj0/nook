@startuml
title Nook - Component Diagram

left to right direction
skinparam componentStyle uml2
skinparam linetype ortho
skinparam nodesep 90
skinparam ranksep 90
skinparam shadowing false

actor User

component "React TypeScript\nFrontend\n<<UI>>" as ReactApp

package "Frontend Features" {
  component "Listings Search\nand Filters" as SearchUi
  component "Listing Detail\nand Notes" as DetailUi
  component "Watchlist Page" as WatchlistUi
  component "Settings Page\nFake Demo Data" as SettingsUi
  component "Rent Calculator" as CalculatorUi
}

package "Spring Boot Backend" {
  component "Listing REST API" as ListingApi
  component "Watchlist REST API" as WatchlistApi
  component "Notes REST API" as NotesApi
  component "Validation and\nException Handling" as Validation
}

database "MySQL Database\n<<database>>\nSeeded listings, images,\nprice history, watchlist,\nlisting notes" as MySqlDb

User --> ReactApp

ReactApp --> SearchUi
ReactApp --> DetailUi
ReactApp --> WatchlistUi
ReactApp --> SettingsUi
ReactApp --> CalculatorUi

SearchUi --> ListingApi : GET /api/listings
DetailUi --> ListingApi : GET /api/listings/{id}
WatchlistUi --> WatchlistApi : GET/POST/DELETE /api/watchlist
DetailUi --> NotesApi : GET/POST notes

ListingApi --> MySqlDb : listings, images
WatchlistApi --> MySqlDb : watchlist_items
NotesApi --> MySqlDb : listing_notes

WatchlistApi --> Validation
NotesApi --> Validation

@enduml
