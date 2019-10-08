module.exports = {
  development: {
    dialect: 'mysql',
    db_username: process.env.DB_USER,
    db_password: process.env.DB_PASS,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    use_env_variable: `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    port: process.env.PORT || '3000'
  },
  test: {
  },
  production: {
  }
}