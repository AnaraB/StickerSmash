import { Account, Client, Avatars, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora.reactNative",
  projectId: "6644bb5b0008ab25ce73",
  databaseId: "6644bd470004ab6a89d7",
  userCollectionId: "6644bdd20036ed00b963",
  videoCollectionId: "6644be0d00187cda9f71",
  storageId: "6645192e00139eb26f08",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

  // Initialize Appwrite services using the provided client

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


// Function to create a new user
export async function createUser(email, password, username){
  try {
    // Create a new account with the provided email, password, and username
    const newAccount = await account.create(
      ID.unique(), // Generate a unique ID for the account
      email, // User's email
      password, // User's password
      username // User's username
    );

    // If the new account creation fails, throw an error
    if (!newAccount) throw Error;

    // Generate an avatar URL based on the user's username
    const avatarUrl = avatars.getInitials(username);

    // Sign in the newly created user
    await signIn(email, password);

    // Create a new document in the user collection of the database
    const newUser = await databases.createDocument(
      config.databaseId, // Database ID where user data is stored
      config.userCollectionId, // Collection ID for user documents
      ID.unique(), // Generate a unique ID for the user document
      {
        accountId: newAccount.$id, // Reference to the account ID
        email: email, // User's email
        username: username, // User's username
        avatar: avatarUrl, // URL of the user's avatar
      }
    );

    // Return the newly created user document
    return newUser;

  } catch (error) {
    // If an error occurs during the process, log the error and throw a new error
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Function to get the current user from the database
export async function getCurrentUser() {
  try {
    // Get the current account from the authentication service
    const currentAccount = await getAccount();

    // If there is no current account, throw an error
    if (!currentAccount) throw Error;

    // Query the database to find the current user based on the account ID
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId, // Specify the database ID
      appwriteConfig.userCollectionId, // Specify the collection ID where user documents are stored
      [Query.equal("accountId", currentAccount.$id)] // Define the query to find the user with the matching account ID
    );

    // If there is no current user, throw an error
    if (!currentUser) throw Error;

    // Return the first document (assumed to be the current user)
    return currentUser.documents[0];
  } catch (error) {
    // If an error occurs during the process, log the error and return null
    console.log(error);
    return null;
  }
}


