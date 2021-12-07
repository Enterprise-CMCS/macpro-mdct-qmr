export const mockStateUser = {
  username: "Okta_State_QMR",
  signInUserSession: {
    idToken: {
      payload: {
        at_hash: "Dgg3ggZQAeTVvEwKcbhFkQ",
        sub: "9a0ead56-959c-4edf-9edd-416b242fa4aa",
        "cognito:groups": ["us-east-1_XjQUt5Qs8_Okta"],
        email_verified: false,
        iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XjQUt5Qs8",
        "cognito:username": "Okta_State_QMR",
        "custom:cms_roles": "mdctqmr-state-user",
        given_name: "State",
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
  },
};

interface MockUsers {
  [key: string]: any;
}

export const mockUsers: MockUsers = {
  STATE_USERS: mockStateUser,
};
