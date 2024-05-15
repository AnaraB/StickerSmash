import { Account, Client, ID } from "react-native-appwrite";

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

const account = new Account(client);

export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
