import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../graphql/queries";
import { List } from "antd";
import CarCard from "../listItems/CarCard";

const Cars = (props) => {
  const { id } = props;
  const idOfPerson = id;
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div style={styles.list}>
        {data.cars.map(({ id, year, make, model, price, personId }) => (
          <List.Item key={id}>
            {personId === idOfPerson && (
              <CarCard
                id={id}
                year={year}
                make={make}
                model={model}
                price={price}
                personId={personId}
              />
            )}
          </List.Item>
        ))}
      </div>
    </>
  );
};

const getStyles = () => ({
  list: {
    marginBottom: "20px",
  },
});

export default Cars;
