# Laravel E-commerce Development Rules

## Core Development Guidelines
1. Be a senior Laravel developer with expertise in e-commerce applications
2. Always check Laravel 12.x documentation for solutions: https://laravel.com/docs/12.x
3. Follow Laravel best practices and conventions
4. Use Eloquent ORM for database operations
5. Implement proper validation using Form Requests
6. Use Inertia.js with React for frontend components

## E-commerce Specific Rules
7. Always consider inventory management when dealing with products
8. Implement proper order status workflows (placed → processing → shipped → cancelled)
9. Use database transactions for order processing to ensure data consistency
10. Implement proper stock reservation system for order items
11. Consider customer relationship management features
12. Always validate product availability before order creation
13. Implement proper price calculations with decimal precision
14. Use factories and seeders for realistic test data

## Database Design Principles
15. Follow the established database schema in JuanPadalaph_database_diagram.dbml
16. Maintain referential integrity with proper foreign key constraints
17. Use appropriate data types (decimal for prices, integer for quantities)
18. Implement soft deletes where appropriate for audit trails
19. Use timestamps for tracking creation and modification dates

## Model Relationships
20. Product hasMany Inventory
20a. Product belongsTo ProductCategory
21. Customer hasMany Orders
22. Order hasMany OrderItems
23. OrderItem belongsTo Product
24. Inventory belongsTo Product
25. OrderItemReservation belongsTo Inventory and OrderItem

## Controller Best Practices
26. Use resource controllers for CRUD operations
27. Implement proper authorization and validation
28. Return Inertia responses for web routes
29. Use JSON responses for API endpoints
30. Handle errors gracefully with appropriate HTTP status codes
31. Implement search and filtering capabilities
32. Use pagination for large datasets

## Frontend Integration
33. Use Inertia.js for seamless SPA experience
34. Create reusable React components
35. Implement proper form validation on frontend
36. Use Tailwind CSS for styling
37. Ensure responsive design for mobile compatibility

## Security Considerations
38. Always validate and sanitize user inputs
39. Use Laravel's built-in authentication system
40. Implement proper authorization policies
41. Protect against SQL injection using Eloquent
42. Use CSRF protection for forms
43. Implement rate limiting for API endpoints

## Performance Optimization
44. Use eager loading to prevent N+1 queries
45. Implement database indexing for frequently queried fields
46. Use caching for expensive operations
47. Optimize images and assets
48. Use queue jobs for heavy operations

## Testing Guidelines
49. Write feature tests for critical e-commerce flows
50. Test order processing workflows thoroughly
51. Mock external services in tests
52. Use factories for test data generation
53. Test edge cases like out-of-stock scenarios

## Code Organization
54. Keep controllers thin, move business logic to services
55. Use form requests for complex validation
56. Create custom middleware when needed
57. Use events and listeners for decoupled functionality
58. Implement proper error handling and logging

## Deployment Considerations
59. Use environment variables for configuration
60. Implement proper database migrations
61. Use Laravel Vite for asset compilation
62. Set up proper logging and monitoring
63. Implement backup strategies for critical data

## Current Project Structure
- Models: Product, ProductCategory, Customer, Order, OrderItem, Inventory, OrderItemReservation
- Controllers: ProductController (with CRUD operations)
- Frontend: Inertia.js with React components
- Database: MySQL with proper relationships
- Authentication: Laravel Breeze with Inertia
- Styling: Tailwind CSS

## Next Development Priorities
1. Implement inventory management system
2. Create order processing workflow
3. Build customer management interface
4. Develop shopping cart functionality
5. Implement payment processing
6. Add product search and filtering
7. Create admin dashboard
8. Implement reporting and analytics
