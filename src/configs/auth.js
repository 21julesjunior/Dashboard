export default {
  meEndpoint: '/v1/user/',
  loginEndpoint: '/v1/user/login',
  registerEndpoint: '/v1/user/register',
  storageTokenKeyName: 'token',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
