import React from "react";
import "./register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { apidomain } from "../../utils/domain";
//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  UserName: yup.string().required("Full name is required"),
  Email: yup.string().email("Email is invalid").required("Email is required"),
  Role: yup.string().required("Role is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    Axios.post(`${apidomain}/auth/register`, data)
      .then((response) => {
        response.data.message &&
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        //alert(response.data.message);
        navigate("/login");
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // alert(response.data.error);
      });
  };
  return (
    <div className="registrationPage">
      <h2 className="registrationTitle">REGISTER</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="myFormLogin">
        <>
          <input
            className="inputFieldLogin"
            type="text"
            placeholder="Your username"
            {...register("UserName")}
          />
          <p>{errors.UserName?.message}</p>
        </>
        <>
          <input
            className="inputFieldLogin"
            type="email"
            placeholder="Your email"
            {...register("Email")}
          />
          <p>{errors.Email?.message}</p>
        </>

        <>
          <label htmlFor="Role"></label>
          <select id="Role" {...register("Role")}>
            <option value="">Select Role</option>
            <option value="Author">Author</option>
            <option value="Reader">Reader</option>
          </select>
          <p>{errors.Role?.message}</p>
        </>

        <>
          <input
            className="inputFieldLogin"
            type="password"
            placeholder="Your password"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </>

        <>
          <input
            className="inputFieldLogin"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
          <p>{errors.confirmPassword?.message}</p>
        </>
        {/* <div className="toLogIn">
          <h4 className="noAccount">Already have an account? </h4>
        </div> */}
        <input type="submit" value="REGISTER" className="submitbtn" />
      </form>
    </div>
  );
}

export default Register;
