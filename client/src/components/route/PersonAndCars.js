import { useQuery } from "@apollo/client";
import { Card, List } from "antd";
import { Link, useParams } from "react-router";
import { GET_PERSON_WITH_CARS } from "../../graphql/queries";

const PersonAndCars = () => {
  const styles = getStyles();

  const params = useParams();
  console.log(params); // ex. {id: '1'}
  const id = params.id;

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id },
    skip: !id, // Prevent running the query if id is missing
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!data || !data.personWithCars) return "No data found.";

  const { person, cars } = data.personWithCars;

  const numberWithCommas = (priceNumber) => {
    const price = Number(priceNumber);
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.carOwner}>
        {person.firstName} {person.lastName}'s cars
      </h2>
      {cars.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 1 }}
          style={styles.list}
          dataSource={cars}
          renderItem={(car, index) => (
            <List.Item key={car.id}>
              <Card
                type="inner"
                title={`${index + 1}. ${car.year} - ${car.make} - ${car.model}`}
                size="large"
                style={styles.carCard}
              >
                <p style={{ fontSize: "15px" }}>
                  Price: ${numberWithCommas(car.price)}
                </p>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <p>No cars are owned.</p>
      )}
      <p style={{ display: "inline", margin: "0" }}>
        <Link to="/" style={styles.link}>
          {"<--"} Go Back Home
        </Link>
      </p>
    </div>
  );
};

const getStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    border: "4px solid #000",
    borderRadius: "8px",
    width: "70%",
    margin: "50px auto",
    padding: "30px",
  },
  carOwner: {
    marginTop: "0",
    textAlign: "center",
  },
  list: {
    marginTop: "15px",
    marginBottom: "30px",
  },
  carCard: {
    width: "100%",
    borderColor: "#aaa",
  },
  link: {
    textDecoration: "none",
    color: "#4a5ce4",
    display: "inline",
  },
});

export default PersonAndCars;
