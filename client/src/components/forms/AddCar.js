import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  ADD_CAR,
  GET_CARS,
  GET_PEOPLE,
  GET_PERSON_WITH_CARS,
} from "../../graphql/queries";
import { v4 as uuid4 } from "uuid";
import { Button, Divider, Form, Input, Select } from "antd";

const AddCar = () => {
  const styles = getStyles();
  const [id] = useState(uuid4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addCar] = useMutation(ADD_CAR);
  const { data, loading, error } = useQuery(GET_PEOPLE);

  useEffect(() => {
    forceUpdate({});
  }, []);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        try {
          const carData = cache.readQuery({ query: GET_CARS });
          cache.writeQuery({
            query: GET_CARS,
            data: {
              cars: [...carData.cars, addCar],
            },
          });

          const peopleData = cache.readQuery({ query: GET_PEOPLE });
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              people: peopleData.people.map((person) =>
                person.id === addCar.personId
                  ? { ...person, cars: [...(person.cars || []), addCar] }
                  : person
              ),
            },
          });
        } catch (error) {
          console.error("Error updating cache: ", error);
        }
      },
      refetchQueries: {
        query: GET_PERSON_WITH_CARS,
        variables: { id: personId },
      },
    });

    form.resetFields();
  };

  return (
    <>
      <Divider
        style={{ fontSize: "30px", fontWeight: "bold", borderColor: "#ddd" }}
      >
        Add Car
      </Divider>
      {data.people.length > 0 ? (
        <Form
          name="add-car-form"
          layout="inline"
          size="large"
          style={{ marginBottom: "30px" }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="year"
            label="Year: "
            rules={[{ required: true, message: "Please enter a year." }]}
          >
            <Input
              placeholder="Year"
              style={{
                borderRadius: "0px",
                width: "100px",
                marginBottom: "10px",
              }}
            />
          </Form.Item>
          <Form.Item
            name="make"
            label="Make: "
            rules={[
              { required: true, message: "Please enter a make(car maker)." },
            ]}
          >
            <Input
              placeholder="Make"
              style={{ borderRadius: "0px", marginBottom: "10px" }}
            />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model: "
            rules={[{ required: true, message: "Please enter a car model." }]}
          >
            <Input
              placeholder="Model"
              style={{ borderRadius: "0px", marginBottom: "10px" }}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price: "
            rules={[{ required: true, message: "Please enter a price." }]}
          >
            <Input prefix="$" style={styles.price} />
          </Form.Item>
          <Form.Item
            name="personId"
            label="Person: "
            rules={[{ required: true, message: "Please select a person." }]}
          >
            <Select
              placeholder="Select a person"
              variant="false"
              style={styles.selectPerson}
            >
              {data.people.map((person, index) => (
                <Select.Option key={index} value={person.id}>
                  {person.firstName} {person.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate="true">
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: "0px" }}
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Add Car
              </Button>
            )}
          </Form.Item>
        </Form>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>
          No people exist. Please add a person first.
        </p>
      )}
    </>
  );
};

const getStyles = () => ({
  price: {
    borderRadius: "0px",
    width: "100px",
    marginBottom: "10px",
  },
  selectPerson: {
    border: "1px solid #ddd",
    borderRadius: "0px",
    marginBottom: "10px",
  },
});

export default AddCar;
