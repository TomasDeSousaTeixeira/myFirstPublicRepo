import sql from './db/connection.js'; // Import your existing connection

// Define your SQL queries as a string
const sqlScript = `
  -- Drop tables if they exist (to reset the database)
  DROP TABLE IF EXISTS public.logs CASCADE;
  DROP TABLE IF EXISTS public.active_qr_codes CASCADE;
  DROP TABLE IF EXISTS public.users CASCADE;

  -- Create Users Table
  CREATE TABLE public.users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(64) NOT NULL,
      username VARCHAR(32) UNIQUE NOT NULL,
      email VARCHAR(32) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      role VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  );

  -- Create Logs Table
  CREATE TABLE public.logs (
      user_id INTEGER NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      action VARCHAR(1) NOT NULL,
      PRIMARY KEY (user_id, date, time),
      CONSTRAINT logs_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
  );

  -- Create Active QR Codes Table
  CREATE TABLE public.active_qr_codes (
      qr VARCHAR PRIMARY KEY NOT NULL
  );

  -- Insert Demo Data (Optional)
  INSERT INTO public.users (email, password, name, username, role) 
  VALUES 
  ('user@user.com', '$2a$10$SD8ODfCWhO2x3//.TXD3Wep2InRY0ci/5iknD1kAYFSNENrWlH2WC', 'user', 'user', 'user'),
  ('admin@admin.com', '$2a$10$S87y0WA0Zwe4Dm3YZqQjhua9ZtzDTU10K/dyC8tIvD377NtBKKVh.', 'admin', 'admin', 'admin');

  INSERT INTO public.logs (user_id, date, time, action) 
  VALUES 
  (2, '2025-01-12', '13:37:00', 'I'),
  (2, '2025-01-12', '20:13:37', 'O'),
  (2, '2025-01-13', '13:37:00', 'I'),
  (2, '2025-01-13', '20:13:37', 'O'),
  (2, '2025-01-14', '13:37:00', 'I'),
  (2, '2025-01-14', '20:13:37', 'O');
`;

// Execute the SQL script
async function setupDatabase() {
  try {
    // Split the script into individual queries
    const queries = sqlScript.split(';').filter((query) => query.trim() !== '');

    // Execute each query
    await sql.begin(async (sql) => {
        for (const query of queries) {
          await sql.unsafe(query);
        }
      });

    console.log('Database setup completed successfully.');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await sql.end(); 
  }
}

setupDatabase();