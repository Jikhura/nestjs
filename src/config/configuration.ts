export default () => ({
  ...process.env,
  PORT: parseInt(process.env.PORT, 10) || 3655,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nestjs-test',
  SECRET_KEY: process.env.SECRET_KEY || 'test',
});
