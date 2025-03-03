import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_PERSON } from "../../graphql/queries";

const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updatePerson] = useMutation(UPDATE_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-person-form"
      layout="inline"
      initialValues={{ firstName, lastName }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please enter a first name." }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please enter a last name." }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdatePerson;
