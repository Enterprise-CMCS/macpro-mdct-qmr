export interface UserInterface {
    username: string,
        attributes: {
            given_name: string,
            family_name: string,
            email: string,
            "custom:cms_roles": string,
        },
}