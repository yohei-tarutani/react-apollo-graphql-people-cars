import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
import { Divider, List } from "antd";
import PersonCard from "../listItems/PersonCard";

const People = () => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // console.log("data", data);
  // { contacts: Array(3) [{__typename: 'Person', id: '1', firstName: 'Paul', lastName: 'Lam'}, {…}, {…}] }
  return (
    <>
      <Divider
        style={{ fontSize: "30px", fontWeight: "bold", borderColor: "#ddd" }}
      >
        Records
      </Divider>
      <div style={styles.listContainer}>
        {data.people.map(({ id, firstName, lastName }) => (
          <div key={id} style={styles.list}>
            <PersonCard id={id} firstName={firstName} lastName={lastName} />
          </div>
        ))}
      </div>
    </>
  );
};

const getStyles = () => ({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0 auto",
  },
  list: {
    marginBottom: "20px",
  },
});

export default People;
