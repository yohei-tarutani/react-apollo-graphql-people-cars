import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";

const client = new ApolloClient({
  uri: "http://localhost:4100/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        {/* <AddContact />
        <Contacts /> */}
      </div>
      //{" "}
    </ApolloProvider>
  );
};

export default App;
