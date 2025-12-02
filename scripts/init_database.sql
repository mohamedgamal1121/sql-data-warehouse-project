/*
=============================================================
Create Database and Schemas
=============================================================
Script Purpose:
    This script creates a new database named 'DataWarehouse' after checking if it already exists. 
    If the database exists, it is dropped and recreated. Additionally, the script sets up three schemas 
    within the database: 'bronze', 'silver', and 'gold'.

WARNING:
    Running this script will drop the entire 'DataWarehouse' database if it exists. 
    All data in the database will be permanently deleted. Proceed with caution 
    and ensure you have proper backups before running this script.
*/

-- =============================================================
-- Create Database and Schemas
-- =============================================================

-- Connect to the default postgres database
\c postgres;

-- Create the database if it does not exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'DataWarehouse') THEN
      EXECUTE 'CREATE DATABASE "DataWarehouse"';
   END IF;
END $$;

-- Connect to the new database
\c DataWarehouse;

-- Create Schemas if they do not exist
CREATE SCHEMA IF NOT EXISTS bronze;
CREATE SCHEMA IF NOT EXISTS silver;
CREATE SCHEMA IF NOT EXISTS gold;



