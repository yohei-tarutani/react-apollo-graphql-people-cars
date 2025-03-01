import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";
import { v4 as uuid4 } from "uuid";
import { Button, Divider, Form, Input } from "antd";

const AddPerson = () => {
  const [id] = useState(uuid4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addPerson] = useMutation(ADD_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <>
      <Divider style={{ fontSize: "35px", fontWeight: "bold" }}>
        Add Person
      </Divider>
      <Form
        name="add-person-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          label="First Name: "
          rules={[{ required: true, message: "Please enter a first name." }]}
        >
          <Input placeholder="First Name" style={{ borderRadius: "0px" }} />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name: "
          rules={[{ required: true, message: "Please enter a last name." }]}
        >
          <Input placeholder="Last Name" style={{ borderRadius: "0px" }} />
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
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPerson;
