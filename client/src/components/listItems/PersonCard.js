import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";
import { Link } from "react-router";
import Cars from "../lists/Cars";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, firstName, lastName } = props;

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div style={styles.container}>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined
              id={id}
              firstName={firstName}
              lastName={lastName}
              onClick={handleButtonClick}
            />,
            <RemovePerson id={id} />,
          ]}
        >
          <p
            style={{
              marginTop: "0",
              paddingBottom: "14px",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            {firstName} {lastName}
          </p>
          <Cars id={id} />
          <Link to={`/people/${id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  container: {},
  card: {
    border: "2px solid #eee",
    borderRadius: "0px",
  },
});

export default PersonCard;
