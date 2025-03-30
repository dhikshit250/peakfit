import psycopg2

def create_tables():
    conn = psycopg2.connect(
        dbname="your_db_name",
        user="your_db_user",
        password="your_db_password",
        host="your_db_host",
        port="your_db_port"
    )
    cur = conn.cursor()

    # Drop old user_profiles table if it exists
    cur.execute("DROP TABLE IF EXISTS user_profiles CASCADE;")

    # Create users table (if not already exists)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users_project2 (
            id SERIAL PRIMARY KEY,
            username VARCHAR(150) UNIQUE NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    # Create new user_profiles table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS user_profiles (
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            height INT,
            weight INT,
            goal TEXT,
            age INT,
            gender TEXT,
            profile_pic TEXT,
            FOREIGN KEY (user_id) REFERENCES users_project2(id) ON DELETE CASCADE
        );
    """)

    conn.commit()
    cur.close()
    conn.close()

# Run the function to apply changes
create_tables()
