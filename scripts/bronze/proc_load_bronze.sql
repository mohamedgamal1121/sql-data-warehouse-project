/*

Stored Procedure: Load Bronze Layer (Source -> Bronze)

Script Purpose:
This stored procedure loads data into the 'bronze' schema from external CSV files.
It performs the following actions:
- Truncates the bronze tables before loading data.
- Uses the 'COPY' command to load data from csv Files to bronze tables.

Parameters:
None.
This stored procedure does not accept any parameters or return any values.

Usage Example:
CALL bronze.load_bronze;
*/

CREATE OR REPLACE PROCEDURE bronze.load_bronze()
LANGUAGE plpgsql
AS $$
DECLARE
    step_start TIMESTAMP;
	  total_start TIMESTAMP;
BEGIN
	total_start := clock_timestamp();
    RAISE NOTICE '================================';
    RAISE NOTICE '    LOADING BRONZE LAYER';
    RAISE NOTICE '================================';

    -- ============ CRM FILES ============

    ------------------------------------------
    -- crm_cust_info TRUNCATE
    ------------------------------------------
    RAISE NOTICE '>>Truncating Table: bronze.crm_cust_info';
    step_start := clock_timestamp();
    TRUNCATE TABLE bronze.crm_cust_info;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;

    ------------------------------------------
    -- crm_cust_info COPY
    ------------------------------------------
    RAISE NOTICE 'Inserting Data Into: bronze.crm_cust_info';
    step_start := clock_timestamp();
    COPY bronze.crm_cust_info (
        cst_id, cst_key, cst_firstname, cst_lastname,
        cst_marital_status, cst_gndr, cst_create_date
    )
    FROM 'C:\sources\source_crm\cust_info.csv'
    DELIMITER ',' CSV HEADER;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;


    ------------------------------------------
    -- crm_prd_info TRUNCATE
    ------------------------------------------
    RAISE NOTICE '>>Truncating Table: bronze.crm_prd_info';
    step_start := clock_timestamp();
    TRUNCATE TABLE bronze.crm_prd_info;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;

    ------------------------------------------
    -- crm_prd_info COPY
    ------------------------------------------
    RAISE NOTICE 'Inserting Data Into: bronze.crm_prd_info';
    step_start := clock_timestamp();
    COPY bronze.crm_prd_info (
        prd_id, prd_key, prd_nm, prd_cost,
        prd_line, prd_start_dt, prd_end_dt
    )
    FROM 'C:\sources\source_crm\prd_info.csv'
    DELIMITER ',' CSV HEADER;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;


    ------------------------------------------
    -- crm_sales_details TRUNCATE
    ------------------------------------------
    RAISE NOTICE '>>Truncating Table: bronze.crm_sales_details';
    step_start := clock_timestamp();
    TRUNCATE TABLE bronze.crm_sales_details;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;

    ------------------------------------------
    -- crm_sales_details COPY
    ------------------------------------------
    RAISE NOTICE 'Inserting Data Into: bronze.crm_sales_details';
    step_start := clock_timestamp();
    COPY bronze.crm_sales_details (
        sls_ord_num, sls_prd_key, sls_cust_id, sls_order_dt,
        sls_ship_dt, sls_due_dt, sls_sales, sls_quantity, sls_price
    )
    FROM 'C:\sources\source_crm\sales_details.csv'
    DELIMITER ',' CSV HEADER;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;


    -- ============ ERP FILES ============

    ------------------------------------------
    -- erp_loc_a101 TRUNCATE
    ------------------------------------------
    RAISE NOTICE '>>Truncating Table: bronze.erp_loc_a101';
    step_start := clock_timestamp();
    TRUNCATE TABLE bronze.erp_loc_a101;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;

    ------------------------------------------
    -- erp_loc_a101 COPY
    ------------------------------------------
    RAISE NOTICE 'Inserting Data Into: bronze.erp_loc_a101';
    step_start := clock_timestamp();
    COPY bronze.erp_loc_a101 (cid, cntry)
    FROM 'C:\sources\source_erp\LOC_A101.csv'
    DELIMITER ',' CSV HEADER;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;


    ------------------------------------------
    -- erp_cust_az12 TRUNCATE
    ------------------------------------------
    RAISE NOTICE '>>Truncating Table: bronze.erp_cust_az12';
    step_start := clock_timestamp();
    TRUNCATE TABLE bronze.erp_cust_az12;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;

    ------------------------------------------
    -- erp_cust_az12 COPY
    ------------------------------------------
    RAISE NOTICE 'Inserting Data Into: bronze.erp_cust_az12';
    step_start := clock_timestamp();
    COPY bronze.erp_cust_az12 (cid, bdate, gen)
    FROM 'C:\sources\source_erp\cust_az12.csv'
    DELIMITER ',' CSV HEADER;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;


    ------------------------------------------
    -- erp_px_cat_g1v2 TRUNCATE
    ------------------------------------------
    RAISE NOTICE '>>Truncating Table: bronze.erp_px_cat_g1v2';
    step_start := clock_timestamp();
    TRUNCATE TABLE bronze.erp_px_cat_g1v2;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;

    ------------------------------------------
    -- erp_px_cat_g1v2 COPY
    ------------------------------------------
    RAISE NOTICE 'Inserting Data Into: bronze.erp_px_cat_g1v2';
    step_start := clock_timestamp();
    COPY bronze.erp_px_cat_g1v2 (id, cat, subcat, maintenance)
    FROM 'C:\sources\source_erp\px_cat_g1v2.csv'
    DELIMITER ',' CSV HEADER;
    RAISE NOTICE 'Duration: %', clock_timestamp() - step_start;
  	
	RAISE NOTICE 'TOTAL BRONZE LAYER LOAD DURATION: %', clock_timestamp() - total_start;

END;
$$;


