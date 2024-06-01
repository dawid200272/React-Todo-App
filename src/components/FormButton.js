import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

function FormButton({ buttonName, action, textColor }) {
  const [form] = Form.useForm();

  function runAction(values) {
    let type = "one-time";

    if (values.isDaily) {
      type = "daily";
    }

    action(values.todo, type);

    // console.log("values", values);

    form.resetFields();
  }

  return (
    <Form layout="inline" form={form} onFinish={runAction}>
      <Form.Item
        label="Todo"
        name="todo"
        rules={[
          {
            required: true,
            message: "Enter todo text",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<label style={{ color: textColor }}>Is daily</label>}
        name="isDaily"
        valuePropName="checked"
      >
        <Checkbox
          style={{
            color: textColor,
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonName}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormButton;
