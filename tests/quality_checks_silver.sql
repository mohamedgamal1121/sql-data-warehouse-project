/*
===============================================================================
Quality Checks
===============================================================================
Script Purpose:
    This script performs various quality checks for data consistency, accuracy, 
    and standardization across the 'silver' layer. It includes checks for:
    - Null or duplicate primary keys.
    - Unwanted spaces in string fields.
    - Data standardization and consistency.
    - Invalid date ranges and orders.
    - Data consistency between related fields.

Usage Notes:
    - Run these checks after data loading Silver Layer.
    - Investigate and resolve any discrepancies found during the checks.
===============================================================================
*/

-- =============================================================
-- Data Quality Checks for 'silver.crm_cust_info'
-- =============================================================

-- Check for duplicates or NULLs in primary key
SELECT cst_id, COUNT(*) AS cnt
FROM silver.crm_cust_info
GROUP BY cst_id
HAVING COUNT(*) > 1 OR cst_id IS NULL;

-- Identify keys with leading/trailing spaces
SELECT cst_key
FROM silver.crm_cust_info
WHERE cst_key <> TRIM(cst_key);

-- Inspect distinct marital statuses for consistency
SELECT DISTINCT cst_marital_status
FROM silver.crm_cust_info;


-- =============================================================
-- Data Quality Checks for 'silver.crm_prd_info'
-- =============================================================

-- Detect duplicates or NULLs in primary key
SELECT prd_id, COUNT(*) AS cnt
FROM silver.crm_prd_info
GROUP BY prd_id
HAVING COUNT(*) > 1 OR prd_id IS NULL;

-- Find product names with unwanted spaces
SELECT prd_nm
FROM silver.crm_prd_info
WHERE prd_nm <> TRIM(prd_nm);

-- Check for invalid or missing product costs
SELECT prd_cost
FROM silver.crm_prd_info
WHERE prd_cost IS NULL OR prd_cost < 0;

-- Review distinct product lines for standardization
SELECT DISTINCT prd_line
FROM silver.crm_prd_info;

-- Validate date logic: start date should not exceed end date
SELECT *
FROM silver.crm_prd_info
WHERE prd_end_dt < prd_start_dt;


-- =============================================================
-- Data Quality Checks for 'silver.crm_sales_details'
-- =============================================================

-- Identify invalid due dates
SELECT NULLIF(sls_due_dt,0) AS sls_due_dt
FROM bronze.crm_sales_details
WHERE sls_due_dt <= 0
   OR LEN(sls_due_dt) <> 8
   OR sls_due_dt > 20500101
   OR sls_due_dt < 19000101;

-- Check for chronological inconsistencies in orders vs shipping/due dates
SELECT *
FROM silver.crm_sales_details
WHERE sls_order_dt > sls_ship_dt
   OR sls_order_dt > sls_due_dt;

-- Validate sales calculations (Sales = Quantity * Price)
SELECT DISTINCT sls_sales, sls_quantity, sls_price
FROM silver.crm_sales_details
WHERE sls_sales IS NULL
   OR sls_quantity IS NULL
   OR sls_price IS NULL
   OR sls_sales <= 0
   OR sls_quantity <= 0
   OR sls_price <= 0
   OR sls_sales <> sls_quantity * sls_price
ORDER BY sls_sales, sls_quantity, sls_price;


-- =============================================================
-- Data Quality Checks for 'silver.erp_cust_az12'
-- =============================================================

-- Detect out-of-range birthdates
SELECT DISTINCT bdate
FROM silver.erp_cust_az12
WHERE bdate < '1924-01-01'
   OR bdate > GETDATE();

-- Inspect gender values for consistency
SELECT DISTINCT gen
FROM silver.erp_cust_az12;


-- =============================================================
-- Data Quality Checks for 'silver.erp_loc_a101'
-- =============================================================

-- List all distinct countries
SELECT DISTINCT cntry
FROM silver.erp_loc_a101
ORDER BY cntry;


-- =============================================================
-- Data Quality Checks for 'silver.erp_px_cat_g1v2'
-- =============================================================

-- Detect unwanted spaces in category fields
SELECT *
FROM silver.erp_px_cat_g1v2
WHERE cat <> TRIM(cat)
   OR subcat <> TRIM(subcat)
   OR maintenance <> TRIM(maintenance);

-- Inspect distinct maintenance values
SELECT DISTINCT maintenance
FROM silver.erp_px_cat_g1v2;

