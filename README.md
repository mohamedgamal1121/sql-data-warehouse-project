📦 SQL Data Warehouse from Scratch (PostgreSQL Implementation)
📘 Overview

This project is an end-to-end Data Engineering project where I built a complete SQL Data Warehouse from scratch using PostgreSQL.
It follows a multi-layered architecture (Bronze → Silver → Gold) to collect, clean, transform, and model data for analytics.

The project is inspired by Data With Baraa – SQL Data Warehouse from Scratch but fully rebuilt and implemented independently using PostgreSQL.

🏗️ Project Architecture

The Data Warehouse is designed using a three-layer architecture:

1️⃣ Bronze Layer – Raw Data

Stores raw data exactly as ingested from source systems (CRM / ERP / CSV files).

No transformations applied.

Used for reproducibility and auditing.

2️⃣ Silver Layer – Cleaned & Processed Data

Data cleaning, formatting, deduplication, and type standardization.

Business logic begins here.

Acts as the base for analytical modeling.

3️⃣ Gold Layer – Analytics & Star Schema

Fact and Dimension tables (Star Schema).

Designed for BI dashboards, KPIs, reporting, and OLAP-style queries.

Optimized for performance and analytical workloads.

🧱 Data Modeling

The Gold Layer follows a Star Schema with examples such as:

Fact Table:

fact_sales or fact_orders (depending on your dataset)

Dimension Tables:

dim_customers

dim_products

dim_dates

dim_stores (optional)

Each table includes:

Surrogate keys

Data types normalization

Foreign-key relationships

Incremental load logic (if applicable)

🔄 ETL / ELT Process

The pipeline includes:

Extract

Import of source data (CSV / CRM / ERP).

Transform

Cleaning and validation

Handling missing values

Standardizing columns

Applying business rules

Load

Load into PostgreSQL Bronze → Silver → Gold layers

Creation of Fact & Dimension tables

Indexing & optimization

Scripts are organized by layer for clarity and reusability.

🛠️ Technologies Used
Component	Tool
Database	PostgreSQL
ETL	SQL (manual scripts)
Modeling	Star Schema
Version Control	Git & GitHub
Optional	pgAdmin / DBeaver
