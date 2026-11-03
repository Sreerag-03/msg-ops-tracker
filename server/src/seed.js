const pool = require('./db');

async function seed() {
  await pool.query(
    'TRUNCATE payments, invoices, jobs, order_items, orders, vendors, customers RESTART IDENTITY CASCADE');

  await pool.query(`INSERT INTO customers (name, state, address) VALUES
    ('Sample Auto Parts Pvt Ltd', 'Maharashtra', 'Pune'),
    ('Sample Appliances Ltd', 'Gujarat', 'Ahmedabad')`);

  await pool.query(`INSERT INTO vendors (name, contact_person, process_type) VALUES
    ('Sample Tooling Works', 'Ravi', 'tooling'),
    ('Sample Machining Co', 'Anil', 'machining')`);

  await pool.query(`INSERT INTO orders (customer_id, customer_po_number, due_date)
    VALUES (1, 'PO-1001', CURRENT_DATE + 14)`);

  await pool.query(`INSERT INTO order_items
    (order_id, description, hsn_code, quantity, unit_price, gst_rate) VALUES
    (1, 'Moulded housing', '3926', 500, 42.50, 18),
    (1, 'Moulded cover', '3926', 500, 18.00, 18)`);

  await pool.query(`INSERT INTO jobs
    (order_id, vendor_id, description, quantity, agreed_cost, sent_date, promised_date)
    VALUES
    (1, 1, 'Mould for housing', 500, 9000.00, CURRENT_DATE - 10, CURRENT_DATE - 3),
    (1, 2, 'Finishing for cover', 500, 2500.00, CURRENT_DATE - 2, CURRENT_DATE + 5)`);

  console.log('Seeded');
  await pool.end();
}

seed();