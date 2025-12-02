📦 SQL Data Warehouse from Scratch 

📘 Overview

This project is an end-to-end Data Engineering project where I built a complete SQL Data Warehouse from scratch using PostgreSQL.
It follows a multi-layered architecture (Bronze → Silver → Gold) to collect, clean, transform, and model data for analytics.

The project is inspired by Data With Baraa – SQL Data Warehouse from Scratch, but fully rebuilt and implemented using PostgreSQL.

🏗️ Project Architecture
1️⃣ Bronze Layer – Raw Data

Stores raw data exactly as ingested from source systems.

No transformations applied.

2️⃣ Silver Layer – Cleaned & Processed Data

Data cleaning, type standardization, and basic transformations.

Business logic starts here.

3️⃣ Gold Layer – Analytics & Star Schema

Final analytical models.

Fact and Dimension tables for reporting and BI tools.

🧱 Data Modeling (Star Schema)

Fact Tables (example):

fact_sales

Dimension Tables (examples):

dim_customers

dim_products


Each table includes:

Surrogate keys

Normalized data types

Foreign key relationships

🔄 ETL / ELT Process

-Extract

Import source data (CSV / external systems).

-Transform

Cleaning

Deduplication

Standardization

Applying business rules

-Load

Insert into Bronze → Silver → Gold layers

Build analytical schema

🛠️ Technologies Used

PostgreSQL

SQL

GitHub

pgAdmin or DBeaver
