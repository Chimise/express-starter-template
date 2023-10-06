import dotenv from 'dotenv';

dotenv.config();

export const IS_PROD_ENV = process.env.NODE_ENV === 'production';

export const IS_STAGING_ENV = process.env.NODE_ENV === 'staging';

export const IS_DEV_ENV = !IS_PROD_ENV && !IS_STAGING_ENV;

export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

export const DB_URL = process.env.DB_URL;

if(!DB_URL) {
    console.error('Mongodb URL not found in env');
}