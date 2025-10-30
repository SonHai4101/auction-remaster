## ADDED Requirements

### Requirement: Transaction History
The system SHALL provide a transaction history for the authenticated user, including purchases, sales, fees, and refunds.

#### Scenario: View transaction list
- WHEN a user opens Transaction History
- THEN they see a list of transactions with date, type, amount, and status

#### Scenario: Download receipt
- WHEN a user selects a transaction and requests a receipt
- THEN the system returns a downloadable receipt (PDF or similar)

#### Scenario: Filter and paginate
- WHEN a user applies filters (date range, type, status)
- THEN the list reflects filters and supports pagination for large result sets


