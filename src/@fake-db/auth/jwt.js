// // ** JWT import
// import axios from 'axios'

// // ** Default AuthConfig
// import defaultAuthConfig from 'src/configs/auth'

// // ** These secrets should be stored securely, such as in environment variables
// const jwtConfig = {
//   secret: process.env.NEXT_PUBLIC_JWT_SECRET,
//   expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
//   refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
// }

// // Mock Adapter
// import mock from 'src/@fake-db/mock'

// // ** Mock users
// const users = []

// // ** Handle login request
// mock.onPost('/jwt/login').reply(async (request) => {
//   const { email, password } = JSON.parse(request.data);

//   try {
//     // Appel de votre API pour authentifier l'utilisateur
//     const response = await axios.post('https://dyinvoice-backend-production.up.railway.app/v1/user/login', {
//       email,
//       password
//     });

//     // Récupération des données utilisateur et du jeton d'accès depuis la réponse de l'API
//     const { accessToken, userData } = response.data;

//     // Création de l'objet de réponse avec le jeton d'accès et les données utilisateur
//     const authResponse = {
//       accessToken,
//       userData
//     };

//     // Retour de la réponse
//     return [200, authResponse];
//   } catch (error) {
//     // Gestion de l'erreur d'authentification
//     const errorResponse = {
//       error: {
//         email: ['Email ou mot de passe invalide']
//       }
//     };

//     // Retour de la réponse d'erreur
//     return [400, errorResponse];
//   }
// });


// // ** Handle register request
// mock.onPost('/jwt/register').reply(async (request) => {
//   const { email, password, username } = JSON.parse(request.data)

//   try {
//     // Call your API to register the user
//     const response = await axios.post('https://dyinvoice-backend-production.up.railway.app/v1/user/register', {
//       email,
//       password,
//       username
//     })

//     // Get the access token from the API response
//     const { accessToken } = response.data

//     // Create the response object with the access token
//     const authResponse = {
//       accessToken
//     }

//     // Return the response
//     return [200, authResponse]
//   } catch (error) {
//     // Handle registration error
//     const errorResponse = {
//       error: {
//         email: error.response.data.message
//       }
//     }

//     // Return the error response
//     return [400, errorResponse]
//   }
// })

// // ** Handle "GET /auth/me" request
// mock.onGet('/auth/me').reply(async (config) => {
//   try {
//     const token = localStorage.getItem('accessToken')

//     if (token) {
//       // Call your API to get the user information
//       const response = await axios.get('https://dyinvoice-backend-production.up.railway.app/v1/user/{appUserId}', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })

//       // Get the user data from the API response
//       const userData = response.data

//       // Return the user data
//       return [200, { userData }]
//     } else {
//       // Handle case where no access token is present
//       return [401, { error: { error: 'No Access Token' } }]
//     }
//   } catch (error) {
//     // Handle token verification errors
//     return [401, { error: { error: 'Invalid User' } }]
//   }
// })

