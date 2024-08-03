import React from "react";
import PropTypes from "prop-types";
import { DiAndroid } from "react-icons/di";
import { BiMessageDots } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { MdAddIcCall } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Avatar, Switch } from "antd";
import { UserOutlined } from '@ant-design/icons';

const WithLayout = ({ children }) => {
  WithLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const onChange = () => {
    
  }
  return (
    <>
    <div className="flex bg-[#F1F4F9] gap-x-4 h-screen sticky">

      <div className="w-20  pb-5 pt-4 justify-between mb-2 border-x-2 border-color-[#E7EAEF]  items-center flex-col  flex text-black-300 text-xl h-full">
     <div className="flex flex-col gap-y-10 text-xl">

        <div>
          <DiAndroid/>
        </div>
        <div>
          <BiMessageDots/>
        </div>
        <div>
          <BsPeople/>
        </div>
        <div>
          <MdAddIcCall/>
        </div>
        <div>
          <IoSettingsOutline/>
        </div>
     </div>
     <div className="flex flex-col gap-y-5">
     <Switch defaultChecked onChange={onChange} />
     <Avatar size={48} icon={<UserOutlined />} />

     </div>

      </div>
      
      <div>{children}</div>
    </div>
    </>

    // <div>WithLayout</div>
  );
};

export default WithLayout;
