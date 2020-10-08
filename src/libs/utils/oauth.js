const oauthConfig = {
  clientId: OAUTH_CLIENT_ID,
  clientSecret: OAUTH_CLIENT_SECRET,
  accessTokenUri: `${OAUTH_HOST}/token`,
  authorizationUri: `${OAUTH_HOST}/auth`,
  redirectUri: `${window.location.origin}/sso/callback`,
  userinfoUri: `${OAUTH_HOST}/userinfo`,
  scopes: ['openid', 'email', 'groups', 'profile', 'offline_access'],
}
