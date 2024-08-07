import { Button, ConfigProvider, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../redux/auth/authSlice";

const { Password } = Input;
const Signup = () => {
  const [form] = Form.useForm();
  //   const dispatch = useDispatch();

  const dispatch = useDispatch();
  const onFinish = (formData) => {
    console.log("🚀 ~ onFinish ~ formData:", formData);
    dispatch(signup({ ...formData }));
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "#FFFFFF",
          },
        },
      }}
    >
      <div className="bg-gradient-to-r from-sky-300 to-indigo-600 h-screen flex items-center flex-col gap-x-4	justify-center ">
        <div className="text-white text-5xl mb-6">InfiHorizon</div>
        <div
          className="flex flex-col items-center w-1/2
          bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-2 border-gray-100  "
        >
          <div className="text-white text-3xl mb-3">Sign up</div>

          <Form
            style={{
              minWidth: 400,
            }}
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Password />
            </Form.Item>
            <Link to="/login" className="text-white">
              Login?
            </Link>
            <Form.Item>
              <Button
                // className="text-black font-semibold bg-white hover:text-white !hover:bg-black"
                className="w-full mt-3"
                type="primary"
                htmlType="submit"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Signup;
