import { APIGatewayProxyEvent } from "aws-lambda";

const authErrorHandler = (state: String, userState: String, userRole: String, operationType: String) => {
    if(!state || !userState || !userRole || !operationType){
        return 403;
    }
    if(operationType === 'POST' || operationType === 'PUT' || operationType === 'DELETE'){
        if(!userRole.includes('STATE') || state.toLowerCase() !== userState.toLowerCase()){
            return 403;
        }
    }
    if(operationType === 'GET'){
        if(userRole.includes('STATE') && state.toLowerCase() !== userState.toLowerCase()){
            return 403;
        }
    }
    return 200;
}

export const errorHandler = (event: APIGatewayProxyEvent, operationType: String) => {
    if (!event.pathParameters) return 400; // throw error message
    if (
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet ||
    !event.headers.user_state ||
    !event.requestContext.identity.cognitoIdentityId
    )  return 400; // throw error message
  
  return authErrorHandler(
    event.pathParameters.state, 
    event.headers.user_state, 
    event.requestContext.identity.cognitoIdentityId, 
    operationType
    )
}