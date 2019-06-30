import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";
import {Link} from '../../../routes'
import jsCookie from "js-cookie";
import { Icon, Input, Button } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  REQUEST_setUserImage,
  REQUEST_setUsetNameLastName,
  REQUEST_setUsername
} from "../../API";
import {
  numberWithCommas,
  convertNumbers2Persian,
  convertNumbers2English
} from "../../lib/numbers";
import { Formik, FormikActions, withFormik } from "formik";

const Card = styled.figure`
  padding: 16px;
  margin: 0 !important;
  img {
    height: 60px;
    width: 60px;
    border-radius: 999em;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.13);
  }
  @media (max-width: 768px) {
    /* width: 97vw;
    max-width: 400px; */
  }
  .roundedBadge {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.13);
    padding: 5px 15px;
  }
  .profilePhotoWithRating-badge {
    position: relative;
    top: -20px;
    z-index: 1;
  }
  .hostDetailCard {
    top: 5px;
    position: relative;
    right: 5px;
    .name {
      display: inline-block;
      font-size: 18px;
      font-weight: 700;
      margin-right: 4px;
      transform: translateY(-2px);
    }
    .hostDetailCard-responseTime {
      color: #949494;
      margin-top: 2px;
    }
  }
  .box {
    display: inline-block;
  }

  figure.usercard {
    padding: 0;
  }
  input[name="firstname"],
  input[name="lastname"] {
    border: none !important;
    text-align: right !important;
    padding: 0 !important;
    height: 24px !important;
    font-family: Vazir;
  }
  input[name="username"] {
    border: 0 !important;
    height: 24px !important;
    font-family: Vazir;
  }
  .ui.input.firstname,
  .ui.input.lastname {
    width: 50%;
    font-size: 16px;
  }
  .name {
    color: #333;
  }
  .img-fluid.edit{
    cursor: pointer;
    transition: 0.5s all;
    :hover {
      transform: scale(0.9);
    }
  }
`;

export const UserCard: React.FunctionComponent<{
  id: any;
  firstname: string;
  lastname: string;
  username: string;
  responceTime: string;
  image: string;
  own?: boolean;
  onUpdate?: any;
}> = ({
  firstname,
  lastname,
  username,
  responceTime,
  image,
  id,
  own = false,
  onUpdate
}) => {
  const link = username ? `/@${username}` : `/user/${id}`;
  const [editMode, setEditMode] = useState(false);
  const inputFile = useRef(null) 
  return (
    <Card className="usercard">
      {!editMode ? (
        <>
          <div className="box">
            <Link route={link}>
              <a>
                <img src={image} className="img-fluid" alt="" />
              </a>
            </Link>
          </div>
          <div className="media-body hostDetailCard box">
            <Link route={link}>
              <a>
                <span className="name">
                  {firstname} {lastname}
                </span>
              </a>
            </Link>
            {/* <div>5,150 trips<span className="hostDetailCard-dotSeparator"></span>
                <span>Joined May 2016</span>
              </div> */}
            <div className="hostDetailCard-responseTime">{responceTime}</div>
          </div>
          {own && (
            <Icon
              name="pencil"
              onClick={() => {
                setEditMode(true);
              }}
            />
          )}
        </>
      ) : (
        <Formik
          initialValues={{
            firstname: firstname,
            lastname: lastname,
            id: id,
            image: null,
            shownImage: image,
            username: username
          }}
          onSubmit={async (values, actions) => {
            if (values.firstname && values.lastname)
              await REQUEST_setUsetNameLastName({
                token: jsCookie.get("token"),
                first_name: values.firstname,
                last_name: values.lastname
              });
            if (values.username)
              await REQUEST_setUsername({
                token: jsCookie.get("token"),
                username: values.username
              });
            if(values.image)
              await REQUEST_setUserImage({
                token: jsCookie.get('token'),
                file: values.image,
              });
            actions.setSubmitting(false);
            toast.success("تغیرات با موفقیت اعمال شد", {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
            setEditMode(false);
            onUpdate({ id: id, username: values.username }); // call parent passed function so it will reload the page
          }}
          render={({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
            isSubmitting,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              {errors.firstname && touched.firstname && (
                <div id="feedback">{errors.firstname}</div>
              )}
              <div className="box">
                <img
                  src={values.shownImage}
                  className="img-fluid edit"
                  alt="ویرایش نمایه"
                  onClick={() => inputFile.current.click()}
                />
                <input
                  type='file'
                  id='file'
                  ref={inputFile}
                  style={{display: 'none'}}
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    const types = ['image/png', 'image/jpeg', 'image/png'];
                      // #2 Catching wrong file types on the client
                    if (types.every(type => file.type !== type)) {
                      alert('لطفاً تصویر را با فرمت jpeg بارگذاری کنید.')
                      return false;
                    }
                    setFieldValue('image', file);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onabort = () =>
                      console.log('file reading was aborted');
                    reader.onerror = () =>
                      console.log('file reading has failed');
                    reader.onload = () => {
                      console.log('file reading was susceed');
                      setFieldValue('shownImage', reader.result);
                    };
                  }}
                />
              </div>
              <div
                className="media-body hostDetailCard box"
                style={{ width: "75%" }}
              >
                <Input
                  type="text"
                  className="firstname"
                  placeholder="نام کوچک"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                  name="firstname"
                />
                <Input
                  type="text"
                  className="lastname"
                  placeholder="نام فامیلی"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                  name="lastname"
                />
                {/* <div>5,150 trips<span className="hostDetailCard-dotSeparator"></span>
                      <span>Joined May 2016</span>
                    </div> */}
                <div className="hostDetailCard-responseTime">
                  {values.responceTime}
                </div>
                <Input
                  iconPosition="left"
                  placeholder="نام کاربری"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                >
                  <Icon name="at" />
                  <input />
                </Input>
              </div>
              <Button
                style={{ height: "48px", marginTop: "16px" }}
                size="small"
                fluid
                basic
                color="teal"
                type="submit"
                loading={isSubmitting}
              >
                {"ذخیره تغیرات"}
              </Button>
            </form>
          )}
        />
      )}
    </Card>
  );
};
