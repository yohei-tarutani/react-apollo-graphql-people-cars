import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../graphql/queries";
import { v4 as uuid4 } from "uuid";
import { Button, Divider, Form, Input, Select } from "antd";

const AddCar = () => {
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
        const carData = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...carData,
            people: [...carData.cars, addCar],
          },
        });
      },
    });
  };

  return (
    <>
      <Divider style={{ fontSize: "35px", fontWeight: "bold" }}>
        Add Car
      </Divider>
      <Form
        name="add-car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="year"
          label="Year: "
          rules={[{ required: true, message: "Please enter a year." }]}
        >
          <Input placeholder="Year" style={{ borderRadius: "0px" }} />
        </Form.Item>
        <Form.Item
          name="make"
          label="Make: "
          rules={[
            { required: true, message: "Please enter a make(car maker)." },
          ]}
        >
          <Input placeholder="Make" style={{ borderRadius: "0px" }} />
        </Form.Item>
        <Form.Item
          name="model"
          label="Model: "
          rules={[{ required: true, message: "Please enter a car model." }]}
        >
          <Input placeholder="Model" style={{ borderRadius: "0px" }} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price: "
          rules={[{ required: true, message: "Please enter a price." }]}
        >
          <Input addonBefore="$" style={{ borderRadius: "0px" }} />
        </Form.Item>
        <Form.Item
          name="person"
          label="Person: "
          rules={[{ required: true, message: "Please select a person." }]}
        >
          <Select placeholder="Select a person">
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
    </>
  );
};

export default AddCar;
