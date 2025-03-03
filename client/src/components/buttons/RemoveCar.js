import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../graphql/queries";
import filter from "lodash.filter";

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (car) => {
            return car.id !== removeCar.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      onClick={handleButtonClick}
      key="delete"
      style={{ color: "red" }}
    />
  );
};

export default RemoveCar;
