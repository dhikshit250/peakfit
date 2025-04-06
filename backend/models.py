from utils.db import get_db_connection

def create_tables():
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # FK: peakfit_profiles → peakfit_users
        cur.execute("""
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT FROM information_schema.tables
                    WHERE table_name = 'peakfit_profiles'
                ) AND NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints
                    WHERE constraint_name = 'fk_profile_user'
                    AND table_name = 'peakfit_profiles'
                ) THEN
                    ALTER TABLE peakfit_profiles
                    ADD CONSTRAINT fk_profile_user
                    FOREIGN KEY (user_id)
                    REFERENCES peakfit_users(id)
                    ON DELETE CASCADE;
                END IF;
            END
            $$;
        """)

        # FK: peakfit_diet_plans → peakfit_users
        cur.execute("""
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT FROM information_schema.tables
                    WHERE table_name = 'peakfit_diet_plans'
                ) AND NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints
                    WHERE constraint_name = 'fk_diet_user'
                    AND table_name = 'peakfit_diet_plans'
                ) THEN
                    ALTER TABLE peakfit_diet_plans
                    ADD CONSTRAINT fk_diet_user
                    FOREIGN KEY (user_id)
                    REFERENCES peakfit_users(id)
                    ON DELETE CASCADE;
                END IF;
            END
            $$;
        """)

        # FK: peakfit_workout_plans → peakfit_users
        cur.execute("""
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT FROM information_schema.tables
                    WHERE table_name = 'peakfit_workout_plans'
                ) AND NOT EXISTS (
                    SELECT 1 FROM information_schema.table_constraints
                    WHERE constraint_name = 'fk_workout_user'
                    AND table_name = 'peakfit_workout_plans'
                ) THEN
                    ALTER TABLE peakfit_workout_plans
                    ADD CONSTRAINT fk_workout_user
                    FOREIGN KEY (user_id)
                    REFERENCES peakfit_users(id)
                    ON DELETE CASCADE;
                END IF;
            END
            $$;
        """)

        conn.commit()
        print("Foreign key constraints added (if missing).")

    except Exception as e:
        conn.rollback()
        print("Error setting constraints:", str(e))

    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    create_tables()
