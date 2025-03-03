import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const CarCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, year, make, model, price, personId } = props;

  const handleButtonClick = () => {
    return setEditMode(!editMode);
  };

  const numberWithCommas = (priceNumber) => {
    const price = Number(priceNumber);
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div style={styles.container}>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
          editMode={editMode}
        />
      ) : (
        <Card
          type="inner"
          style={styles.card}
          title={`${year} ${make} ${model} -> $${numberWithCommas(price)}`}
          actions={[
            <EditOutlined
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
              onClick={handleButtonClick}
            />,
            <RemoveCar id={id} />,
          ]}
        />
      )}
    </div>
  );
};

const getStyles = () => ({
  container: {},
  card: {
    marginTop: "15px",
    border: "2px solid #eee",
    borderRadius: "0px",
  },
});

export default CarCard;
