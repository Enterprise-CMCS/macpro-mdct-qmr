export const mockStateUser = {
  username: "Okta_State_QMR",
  pool: {
    userPoolId: "us-east-1_XjQUt5Qs8",
    clientId: "39jvme8ebutq75cttgno8c1vn4",
    client: {
      endpoint: "https://cognito-idp.us-east-1.amazonaws.com/",
      fetchOptions: {},
    },
    advancedSecurityDataCollectionFlag: true,
    storage: {
      "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.accessToken":
        "eyJraWQiOiJMM1lsc2JzS2Q4VnFTNVIxNk82MnllXC9CbWVOXC9oTFo3VTdRc3FON3NEc1E9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5YTBlYWQ1Ni05NTljLTRlZGYtOWVkZC00MTZiMjQyZmE0YWEiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfWGpRVXQ1UXM4X09rdGEiXSwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTYzODg0ODk0NCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfWGpRVXQ1UXM4IiwiZXhwIjoxNjM4ODUyNTQ0LCJpYXQiOjE2Mzg4NDg5NDQsInZlcnNpb24iOjIsImp0aSI6IjU0NDQ3Y2ZmLTUyM2YtNDBmMy1hNGFkLTE3NzgyNzE1MmJiYyIsImNsaWVudF9pZCI6IjM5anZtZThlYnV0cTc1Y3R0Z25vOGMxdm40IiwidXNlcm5hbWUiOiJPa3RhX1N0YXRlX1FNUiJ9.KJ1KLdUh1Uv9txVAoiaj9xY9CKD1G1V24ViqAP0W8_hTcdvdMi7ZPSpPxKKVVzU0p4sQd6o0N0yLVWaaDX6y8BTb3zRmUgiqLsnUbFf_Q1Y3ha-EME8Uud0IY5UtjlPgzqTEPPDrGnkTgk6x2208fgXBGH3LrlAvA4hy92zjXnCW5KnpVS1Rp1v4Wa_cxNa6uJPZ8S62x4ec6_m2Ns5ZiW24o4lOqH45AgH8EvYwRNK8KjM8hb4nStCbUMC7YAk6jto6hznimQQaXxXJ_zca_elBE7H_CMcaRitUdcnl6yQW0AXXEuJZClk_IF8yzVebQGCPbl4nRGocuO2BPtg8-A",
      "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.refreshToken":
        "",
      "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.LastAuthUser":
        "Okta_State_QMR",
      "amplify-signin-with-hostedUI": "true",
      "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.clockDrift":
        "1",
      "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.idToken":
        "eyJraWQiOiI1TlF3ZllvazJxRWE1b2tTa1Z5aFZQbE1qWHc1TEdPOTJJRmd2TWxjVmY0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiRGdnM2dnWlFBZVRWdkV3S2NiaEZrUSIsInN1YiI6IjlhMGVhZDU2LTk1OWMtNGVkZi05ZWRkLTQxNmIyNDJmYTRhYSIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9YalFVdDVRczhfT2t0YSJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1hqUVV0NVFzOCIsImNvZ25pdG86dXNlcm5hbWUiOiJPa3RhX1N0YXRlX1FNUiIsImN1c3RvbTpjbXNfcm9sZXMiOiJtZGN0cW1yLXN0YXRlLXVzZXIiLCJnaXZlbl9uYW1lIjoiU3RhdGUiLCJub25jZSI6Im1ndEdMQmFwQjRMaGFtaE9JS2t5TUxJNUNVOW9zZFVCX0JEN2U4cHBjVF95UDI0V0pzV0o5R1ltWkRCSUN1M0NJZDVNZEtJX002akIzcThmSHZ2RTZ1Qi14V0lVTzdTQnFfYmt0MzR5TmtKdnBOMzFGUmowMGZQWG9LMlFpSWxvRFBvN3YwU3drYnN0SDR3TEhjbUQwY2RxZXJDajlxLThINzNwQTE4eTJKMCIsImF1ZCI6IjM5anZtZThlYnV0cTc1Y3R0Z25vOGMxdm40IiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiU3RhdGVfUU1SIiwicHJvdmlkZXJOYW1lIjoiT2t0YSIsInByb3ZpZGVyVHlwZSI6IlNBTUwiLCJpc3N1ZXIiOiJodHRwOlwvXC93d3cub2t0YS5jb21cL2V4azkzYXdwd3B0YVUyWTg2Mjk3IiwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2MzMwOTU4OTA0MDEifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM4ODQ4OTQ0LCJleHAiOjE2Mzg4NTI1NDQsImlhdCI6MTYzODg0ODk0NCwiZmFtaWx5X25hbWUiOiJRTVIiLCJqdGkiOiJmOGUyOGQ4Yy04NmYzLTRmOWItYjA2ZS1jNWFiZTViMmMxNmIiLCJlbWFpbCI6InBib2dnYXJhcHVAY29sbGFicmFsaW5rLmNvbSJ9.DD0o8HC2aNDxNs_Qs-pifKZ_VdKfG88Xou50sMhWf-pu_qA6fsqXP8hP_hzj_Wp-m6Tz-z0rBslzB8hIESs7-NRDOnP1XqvDNUxIoHwOvAp79mgjr8g10toeIi2xF_PrZz4x5yzBaPZOFYbhK_G0rQJI5dT6DiLpCJNRN7v8Qw3oOG0UoAu5fPy_Bkn_M5vO31sddBwVG2zxK5xgDiUZm8TbPe5aeRrxhafFYzwyHA4YsNeTRCFQE7rrwiYbCvn7MgUQU_duigBTcTwK4To5AzxlKlwhce0BMz92lBY584ziHq14mH4tbO1sHEpy8CwOTYR1s7vJlp1DsLzJRhhBAQ",
      "amplify-redirected-from-hosted-ui": "true",
    },
  },
  Session: null,
  client: {
    endpoint: "https://cognito-idp.us-east-1.amazonaws.com/",
    fetchOptions: {},
  },
  signInUserSession: {
    idToken: {
      jwtToken:
        "eyJraWQiOiI1TlF3ZllvazJxRWE1b2tTa1Z5aFZQbE1qWHc1TEdPOTJJRmd2TWxjVmY0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiRGdnM2dnWlFBZVRWdkV3S2NiaEZrUSIsInN1YiI6IjlhMGVhZDU2LTk1OWMtNGVkZi05ZWRkLTQxNmIyNDJmYTRhYSIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9YalFVdDVRczhfT2t0YSJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1hqUVV0NVFzOCIsImNvZ25pdG86dXNlcm5hbWUiOiJPa3RhX1N0YXRlX1FNUiIsImN1c3RvbTpjbXNfcm9sZXMiOiJtZGN0cW1yLXN0YXRlLXVzZXIiLCJnaXZlbl9uYW1lIjoiU3RhdGUiLCJub25jZSI6Im1ndEdMQmFwQjRMaGFtaE9JS2t5TUxJNUNVOW9zZFVCX0JEN2U4cHBjVF95UDI0V0pzV0o5R1ltWkRCSUN1M0NJZDVNZEtJX002akIzcThmSHZ2RTZ1Qi14V0lVTzdTQnFfYmt0MzR5TmtKdnBOMzFGUmowMGZQWG9LMlFpSWxvRFBvN3YwU3drYnN0SDR3TEhjbUQwY2RxZXJDajlxLThINzNwQTE4eTJKMCIsImF1ZCI6IjM5anZtZThlYnV0cTc1Y3R0Z25vOGMxdm40IiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiU3RhdGVfUU1SIiwicHJvdmlkZXJOYW1lIjoiT2t0YSIsInByb3ZpZGVyVHlwZSI6IlNBTUwiLCJpc3N1ZXIiOiJodHRwOlwvXC93d3cub2t0YS5jb21cL2V4azkzYXdwd3B0YVUyWTg2Mjk3IiwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2MzMwOTU4OTA0MDEifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM4ODQ4OTQ0LCJleHAiOjE2Mzg4NTI1NDQsImlhdCI6MTYzODg0ODk0NCwiZmFtaWx5X25hbWUiOiJRTVIiLCJqdGkiOiJmOGUyOGQ4Yy04NmYzLTRmOWItYjA2ZS1jNWFiZTViMmMxNmIiLCJlbWFpbCI6InBib2dnYXJhcHVAY29sbGFicmFsaW5rLmNvbSJ9.DD0o8HC2aNDxNs_Qs-pifKZ_VdKfG88Xou50sMhWf-pu_qA6fsqXP8hP_hzj_Wp-m6Tz-z0rBslzB8hIESs7-NRDOnP1XqvDNUxIoHwOvAp79mgjr8g10toeIi2xF_PrZz4x5yzBaPZOFYbhK_G0rQJI5dT6DiLpCJNRN7v8Qw3oOG0UoAu5fPy_Bkn_M5vO31sddBwVG2zxK5xgDiUZm8TbPe5aeRrxhafFYzwyHA4YsNeTRCFQE7rrwiYbCvn7MgUQU_duigBTcTwK4To5AzxlKlwhce0BMz92lBY584ziHq14mH4tbO1sHEpy8CwOTYR1s7vJlp1DsLzJRhhBAQ",
      payload: {
        at_hash: "Dgg3ggZQAeTVvEwKcbhFkQ",
        sub: "9a0ead56-959c-4edf-9edd-416b242fa4aa",
        "cognito:groups": ["us-east-1_XjQUt5Qs8_Okta"],
        email_verified: false,
        iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XjQUt5Qs8",
        "cognito:username": "Okta_State_QMR",
        "custom:cms_roles": "mdctqmr-state-user",
        given_name: "State",
        nonce:
          "mgtGLBapB4LhamhOIKkyMLI5CU9osdUB_BD7e8ppcT_yP24WJsWJ9GYmZDBICu3CId5MdKI_M6jB3q8fHvvE6uB-xWIUO7SBq_bkt34yNkJvpN31FRj00fPXoK2QiIloDPo7v0SwkbstH4wLHcmD0cdqerCj9q-8H73pA18y2J0",
        aud: "39jvme8ebutq75cttgno8c1vn4",
        identities: [
          {
            userId: "State_QMR",
            providerName: "Okta",
            providerType: "SAML",
            issuer: "http://www.okta.com/exk93awpwptaU2Y86297",
            primary: "true",
            dateCreated: "1633095890401",
          },
        ],
        token_use: "id",
        auth_time: 1638848944,
        exp: 1638852544,
        iat: 1638848944,
        family_name: "QMR",
        jti: "f8e28d8c-86f3-4f9b-b06e-c5abe5b2c16b",
        email: "pboggarapu@collabralink.com",
      },
    },
    refreshToken: {
      token: "",
    },
    accessToken: {
      jwtToken:
        "eyJraWQiOiJMM1lsc2JzS2Q4VnFTNVIxNk82MnllXC9CbWVOXC9oTFo3VTdRc3FON3NEc1E9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5YTBlYWQ1Ni05NTljLTRlZGYtOWVkZC00MTZiMjQyZmE0YWEiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfWGpRVXQ1UXM4X09rdGEiXSwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTYzODg0ODk0NCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfWGpRVXQ1UXM4IiwiZXhwIjoxNjM4ODUyNTQ0LCJpYXQiOjE2Mzg4NDg5NDQsInZlcnNpb24iOjIsImp0aSI6IjU0NDQ3Y2ZmLTUyM2YtNDBmMy1hNGFkLTE3NzgyNzE1MmJiYyIsImNsaWVudF9pZCI6IjM5anZtZThlYnV0cTc1Y3R0Z25vOGMxdm40IiwidXNlcm5hbWUiOiJPa3RhX1N0YXRlX1FNUiJ9.KJ1KLdUh1Uv9txVAoiaj9xY9CKD1G1V24ViqAP0W8_hTcdvdMi7ZPSpPxKKVVzU0p4sQd6o0N0yLVWaaDX6y8BTb3zRmUgiqLsnUbFf_Q1Y3ha-EME8Uud0IY5UtjlPgzqTEPPDrGnkTgk6x2208fgXBGH3LrlAvA4hy92zjXnCW5KnpVS1Rp1v4Wa_cxNa6uJPZ8S62x4ec6_m2Ns5ZiW24o4lOqH45AgH8EvYwRNK8KjM8hb4nStCbUMC7YAk6jto6hznimQQaXxXJ_zca_elBE7H_CMcaRitUdcnl6yQW0AXXEuJZClk_IF8yzVebQGCPbl4nRGocuO2BPtg8-A",
      payload: {
        sub: "9a0ead56-959c-4edf-9edd-416b242fa4aa",
        "cognito:groups": ["us-east-1_XjQUt5Qs8_Okta"],
        token_use: "access",
        scope: "openid profile email",
        auth_time: 1638848944,
        iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XjQUt5Qs8",
        exp: 1638852544,
        iat: 1638848944,
        version: 2,
        jti: "54447cff-523f-40f3-a4ad-177827152bbc",
        client_id: "39jvme8ebutq75cttgno8c1vn4",
        username: "Okta_State_QMR",
      },
    },
    clockDrift: 1,
  },
  authenticationFlowType: "USER_SRP_AUTH",
  storage: {
    "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.accessToken":
      "eyJraWQiOiJMM1lsc2JzS2Q4VnFTNVIxNk82MnllXC9CbWVOXC9oTFo3VTdRc3FON3NEc1E9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5YTBlYWQ1Ni05NTljLTRlZGYtOWVkZC00MTZiMjQyZmE0YWEiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfWGpRVXQ1UXM4X09rdGEiXSwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTYzODg0ODk0NCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfWGpRVXQ1UXM4IiwiZXhwIjoxNjM4ODUyNTQ0LCJpYXQiOjE2Mzg4NDg5NDQsInZlcnNpb24iOjIsImp0aSI6IjU0NDQ3Y2ZmLTUyM2YtNDBmMy1hNGFkLTE3NzgyNzE1MmJiYyIsImNsaWVudF9pZCI6IjM5anZtZThlYnV0cTc1Y3R0Z25vOGMxdm40IiwidXNlcm5hbWUiOiJPa3RhX1N0YXRlX1FNUiJ9.KJ1KLdUh1Uv9txVAoiaj9xY9CKD1G1V24ViqAP0W8_hTcdvdMi7ZPSpPxKKVVzU0p4sQd6o0N0yLVWaaDX6y8BTb3zRmUgiqLsnUbFf_Q1Y3ha-EME8Uud0IY5UtjlPgzqTEPPDrGnkTgk6x2208fgXBGH3LrlAvA4hy92zjXnCW5KnpVS1Rp1v4Wa_cxNa6uJPZ8S62x4ec6_m2Ns5ZiW24o4lOqH45AgH8EvYwRNK8KjM8hb4nStCbUMC7YAk6jto6hznimQQaXxXJ_zca_elBE7H_CMcaRitUdcnl6yQW0AXXEuJZClk_IF8yzVebQGCPbl4nRGocuO2BPtg8-A",
    "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.refreshToken":
      "",
    "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.LastAuthUser":
      "Okta_State_QMR",
    "amplify-signin-with-hostedUI": "true",
    "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.clockDrift":
      "1",
    "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.idToken":
      "eyJraWQiOiI1TlF3ZllvazJxRWE1b2tTa1Z5aFZQbE1qWHc1TEdPOTJJRmd2TWxjVmY0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiRGdnM2dnWlFBZVRWdkV3S2NiaEZrUSIsInN1YiI6IjlhMGVhZDU2LTk1OWMtNGVkZi05ZWRkLTQxNmIyNDJmYTRhYSIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9YalFVdDVRczhfT2t0YSJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1hqUVV0NVFzOCIsImNvZ25pdG86dXNlcm5hbWUiOiJPa3RhX1N0YXRlX1FNUiIsImN1c3RvbTpjbXNfcm9sZXMiOiJtZGN0cW1yLXN0YXRlLXVzZXIiLCJnaXZlbl9uYW1lIjoiU3RhdGUiLCJub25jZSI6Im1ndEdMQmFwQjRMaGFtaE9JS2t5TUxJNUNVOW9zZFVCX0JEN2U4cHBjVF95UDI0V0pzV0o5R1ltWkRCSUN1M0NJZDVNZEtJX002akIzcThmSHZ2RTZ1Qi14V0lVTzdTQnFfYmt0MzR5TmtKdnBOMzFGUmowMGZQWG9LMlFpSWxvRFBvN3YwU3drYnN0SDR3TEhjbUQwY2RxZXJDajlxLThINzNwQTE4eTJKMCIsImF1ZCI6IjM5anZtZThlYnV0cTc1Y3R0Z25vOGMxdm40IiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiU3RhdGVfUU1SIiwicHJvdmlkZXJOYW1lIjoiT2t0YSIsInByb3ZpZGVyVHlwZSI6IlNBTUwiLCJpc3N1ZXIiOiJodHRwOlwvXC93d3cub2t0YS5jb21cL2V4azkzYXdwd3B0YVUyWTg2Mjk3IiwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2MzMwOTU4OTA0MDEifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM4ODQ4OTQ0LCJleHAiOjE2Mzg4NTI1NDQsImlhdCI6MTYzODg0ODk0NCwiZmFtaWx5X25hbWUiOiJRTVIiLCJqdGkiOiJmOGUyOGQ4Yy04NmYzLTRmOWItYjA2ZS1jNWFiZTViMmMxNmIiLCJlbWFpbCI6InBib2dnYXJhcHVAY29sbGFicmFsaW5rLmNvbSJ9.DD0o8HC2aNDxNs_Qs-pifKZ_VdKfG88Xou50sMhWf-pu_qA6fsqXP8hP_hzj_Wp-m6Tz-z0rBslzB8hIESs7-NRDOnP1XqvDNUxIoHwOvAp79mgjr8g10toeIi2xF_PrZz4x5yzBaPZOFYbhK_G0rQJI5dT6DiLpCJNRN7v8Qw3oOG0UoAu5fPy_Bkn_M5vO31sddBwVG2zxK5xgDiUZm8TbPe5aeRrxhafFYzwyHA4YsNeTRCFQE7rrwiYbCvn7MgUQU_duigBTcTwK4To5AzxlKlwhce0BMz92lBY584ziHq14mH4tbO1sHEpy8CwOTYR1s7vJlp1DsLzJRhhBAQ",
    "amplify-redirected-from-hosted-ui": "true",
  },
  keyPrefix: "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4",
  userDataKey:
    "CognitoIdentityServiceProvider.39jvme8ebutq75cttgno8c1vn4.Okta_State_QMR.userData",
};

export const mockUsers = {
  STATE_USERS: mockStateUser,
};
