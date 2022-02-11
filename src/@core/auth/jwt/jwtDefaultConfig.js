export default {
  // Endpoints
  loginEndpoint: 'http://localhost/lifeapp-api/api/admin/login',
  registerEndpoint: 'http://localhost/lifeapp-api/api/admin/register',
  // loginEndpoint: 'https://dev.gappubobo.com/api/admin/login',
  // registerEndpoint: 'https://dev.gappubobo.com/api/admin/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
