# Storefront Demo

This project is a frontend demo for an e-commerce storefront. Its objective is to demonstrate solutioning for the following requirements:

- Fetch and display a paginated, sortable list of products (The data is mocked for the purposes of this demo).
- View individual products in a new page with additional information such as description and technical specifications.
- Allow for management of quantity desired in individual product pages and checkout.
- Persist cart state between page navigations and reloads.
- Allow for selection of shipping method, and include its price in the calculated total.

The source code is hosted at [https://github.com/izzansays/storefront-demo](https://github.com/izzansays/storefront-demo).

## Skills demonstrated

As the intention of this project is to demonstrate frontend competencies, a minimal setup of React, TypeScript, and Vite was chosen to highlight the following core skills:

- Data fetching and handling of loading and error states
- State management with React Hooks such as useState, useEffect and useContext
- Enforcing data structures with Typescript
- Mobile responsive design

## Possible enhancements

- Using a framework like Next.js or Astro to conditionally render statically at build time or server-side upon request time. For example, elements like the navigation or product filters could be statically rendered while the list of products could be server-side rendered.
- Proper backend functionality with transactional locks. An example query might look like:  
```sql
BEGIN;

-- Check stock and lock the row
SELECT quantity INTO @current_stock
FROM products
WHERE id = $1
FOR UPDATE;

IF @current_stock < $2 THEN
    ROLLBACK;
    RETURN;
END IF;

-- Deduct stock
UPDATE products
SET quantity = quantity - $2
WHERE id = $1;

-- Insert order
INSERT INTO orders (user_id, order_date, shipping_method, total)
VALUES ($3, NOW(), $4, $5)
RETURNING id INTO @order_id;

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES (@order_id, $1, $2, $6);

COMMIT;
```
- Multi-step form management with input validation
- Admin functionality to view orders, edit product details and manage promo codes
- Performance optimisation with object storage for images and caching frontend artifacts on a CDN
