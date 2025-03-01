import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";
import AddPerson from "./components/forms/AddPerson";
import AddCar from "./components/forms/AddCar";

const client = new ApolloClient({
  uri: "http://localhost:4100/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <AddPerson />
        <AddCar />
        {/* <AddContact />
        <Contacts /> */}
      </div>
      //{" "}
    </ApolloProvider>
  );
};

export default App;
