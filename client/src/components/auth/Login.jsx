import { Button, ConfigProvider, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";

const { Password } = Input;
const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => {
    console.log(state, "state");
    return state.auth.isAuthenticated;
  });
  const onFinish = (formData) => {
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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
          className="flex flex-col items-center
          bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-2 border-gray-100 py-6 px-24  "
        >
          <div className="text-white text-3xl mb-3">Login</div>

          <Form layout="vertical" onFinish={onFinish} form={form}>
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
            <Link to="/signup" className="text-white">
              Signup?
            </Link>
            <Form.Item>
              <Button
                // className="text-black font-semibold bg-white hover:text-white !hover:bg-black"
                className="w-full mt-3"
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
