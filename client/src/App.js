import "./App.css";
import Title from "./components/layout/Title";
import AddPerson from "./components/forms/AddPerson";
import AddCar from "./components/forms/AddCar";
import People from "./components/lists/People";

const App = () => {
  return (
    <div className="App">
      <Title />
      <AddPerson />
      <AddCar />
      <People />
    </div>
  );
};

export default App;
