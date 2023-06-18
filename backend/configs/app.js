import dotenv from 'dotenv';
dotenv.config();
export default {
  port: process.env.PORT || 3009,
  isProduction: process.env.NODE_ENV === 'production',
  apiVersion: process.env.API_VERSION || 1,
  token_exp_days: process.env.TOKEN_EXP_DAYS || 90,
  secret:
    process.env.NODE_ENV === 'production'
      ? process.env.SECRET
      : 'piyawat-transport',
  mongodbUri:
    process.env.MONGODB_URI || 'mongodb://localhost:27017/piyawat-transport',
  pageLimit: process.env.PAGE_LIMIT || 1000,
  gcsBucket: process.env.GCS_BUCKET || '',
  gcsProjectId: process.env.GCS_PROJECT_ID || '',
  lineNotifyClientId: process.env.LINE_NOTIFY_CLIENT_ID || '',
  lineNotifyClientSecret: process.env.LINE_NOTIFY_CLIENT_SECRET || '',
  lineNotifyRedirectURL: process.env.LINE_NOTIFY_REDIRECT_URL || '',
  maxUploadFileSize: process.env.MAX_UPLOAD_SIZE || 1048576000,
  maxFilenameSize: process.env.MAX_FILENAME_SIZE || 300,
  serverName: process.env.SERVER_NAME || '',
  processedQueueName: 'finishing_task',
  failProcessedQueueName: 'error_task',
};
