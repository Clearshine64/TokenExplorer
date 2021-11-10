import { EthFunctions } from "./functions/ethFunctions";
import * as express from "express";
import { importSchema } from "graphql-import";
import path = require("path");
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers/resolvers";

console.log('Hello world!');

const fs = require("fs");

const API_KEY = "g1xbWZ0Rq2sKRL7wXWpHxfgP9o1Mk9kj";
const uri = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}`;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(uri);

const startServer = async() => {
  const app = express();
  const typeDefs = importSchema(path.join(__dirname, "schema.graphql"));
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({app});
  app.listen({port: 4000}, () => {
    console.log(`Server ready on localhost:4000${server.graphqlPath}`)
  })
}


const main = async() => {

  let ethFunctions = EthFunctions(web3);
  let addressLink = "0x514910771af9ca656af840dff83e8264ecf986ca";
  let addressAAVE = "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9";;
  // console.log(await ethFunctions.getPriceUSDV3(addressAAVE));
  await startServer();
}

main();