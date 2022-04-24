/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(event);
  const userName = event.pathParameters.userName;
  const capitalizeFirstLetter = (string) => {
    let a = string.charAt(0).toUpperCase() + string.slice(1);
    return a.replace(' ', '-');
  };
  const customer = {
    userName: userName,
    formattedName: capitalizeFirstLetter(userName),
  };
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(customer),
  };
  return response;
};
