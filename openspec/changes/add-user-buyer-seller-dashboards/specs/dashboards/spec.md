## ADDED Requirements

### Requirement: Buyer Dashboard
The system SHALL provide a Buyer Dashboard listing active bids, won auctions, and payment status for the authenticated user.

#### Scenario: View active bids
- WHEN a buyer opens the Buyer Dashboard
- THEN they see a list of their active bids with current leading/losing status and bid amounts

#### Scenario: View won auctions
- WHEN a buyer opens the Buyer Dashboard
- THEN they see auctions they have won with next steps and payment status

#### Scenario: Payment status indicators
- WHEN a buyer has unpaid wins
- THEN the dashboard shows a clear status (e.g., Pending Payment) and a call to action

### Requirement: Seller Dashboard
The system SHALL provide a Seller Dashboard listing current listings, sold items, and revenue statistics for the authenticated user.

#### Scenario: View current listings
- WHEN a seller opens the Seller Dashboard
- THEN they see their active listings with key metrics (views/bids/current price)

#### Scenario: View sold items
- WHEN a seller opens the Seller Dashboard
- THEN they see a list of sold items with final price and buyer info (where permitted)

#### Scenario: Revenue stats
- WHEN a seller opens the Seller Dashboard
- THEN they see aggregated revenue metrics (e.g., last 30 days, total)

### Requirement: User Activity History
The system SHALL provide a consolidated history for the authenticated user across relevant events (bids placed, wins, purchases, listings, sales).

#### Scenario: Filterable history
- WHEN a user opens History and applies filters (type/date)
- THEN the results are filtered accordingly with pagination where needed


