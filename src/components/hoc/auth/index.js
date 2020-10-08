/* eslint-disable react/display-name */
import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import { getAuthToken } from 'libs/utils/oauth-token'

const withAuth = Component => props => {
  const accessToken = getAuthToken()
  const ssoCallback = () => {
    setTimeout(() => {
      if (!accessToken || accessToken === '') {
        // navigate(to, { state={}, replace=false })
        navigate('/login')
      }
    }, 5000)
  }
  useEffect(() => {
    console.log('useEffect', {
      accessToken,
    })
    if (!accessToken || accessToken === '') {
      navigate(`/sso/callback`)
    }
  })

  return <Component {...props } ssoCallback={ssoCallback} />
}

export default withAuth
