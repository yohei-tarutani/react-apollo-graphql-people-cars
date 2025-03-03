import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_CAR } from "../../graphql/queries";

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [updateCar] = useMutation(UPDATE_CAR);
  const { data, loading, error } = useQuery(GET_PEOPLE);

  useEffect(() => {
    forceUpdate({});
  }, []);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      initialValues={{ year, make, model, price, personId }}
      onFinish={onFinish}
      style={{ marginBottom: "15px" }}
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
        rules={[{ required: true, message: "Please enter a make(car maker)." }]}
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
        <Input
          prefix="$"
          style={{
            borderRadius: "0px",
            width: "100px",
            marginBottom: "10px",
          }}
        />
      </Form.Item>
      <Form.Item
        name="personId"
        label="Person: "
        rules={[{ required: true, message: "Please select a person." }]}
      >
        <Select
          placeholder="Select a person"
          style={{ borderRadius: "0px", marginBottom: "10px" }}
        >
          {data.people.map((person, index) => (
            <Select.Option key={index} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
