# SETUP
Copy .env-example to .env
RUN docker docker compose up -d

# DATABASE MAINTENANCE
If you have made changes to the database that should be applied in future installations create a file inside db_init_scripts 
with the naming convention of YYYY_MM_DD.sql (EX: 2023_09_06.sql).
You can run the files manually to update the database to the state you want.

