import React from "react";
import { useForm } from "react-hook-form";

import getCurrentDate from "../utils/getCurrentDate";
// import sendData from "../utils/sendData";
import "./AddSubscriberForm.scss";

export default function AddSubscriberForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const saveData = async (formData) => {
    var raw = JSON.stringify({
      records: [
        {
          fields: {
            Name: formData.Name,
            Email: formData.Email,
            SubscriptionData: getCurrentDate()
          }
        }
      ]
    });

    const requestOptions = {
      method: "POST",
      headers: {
        // "Access-Control-Allow-Origin" : "*",
        // "Access-Control-Allow-Headers" : "*",
        // "Access-Control-Allow-Credentials" : true,
        // "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
        // "Access-Control-Request-Headers" : "",
        // "credentials" : "include",
        // "api_key": "keyEgyPm893dRucZN",
        // "Cookie" : "brw=brwa1ai1GkwA1E7Pk"
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Request-Headers": true,
        // api_key: `${process.env.API_KEY}`,
        // Cookie: "brw=brwa1ai1GkwA1E7Pk"
        "Content-Type" : "application/json",
        "Authorization" : "Bearer keyEgyPm893dRucZN"
      },
      body: raw,
      redirect: "follow"
    };
    // sendData(requestOptions);
    try {
      // console.log(process.env.REACT_APP_API_KEY);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_SUBS}`,
        requestOptions
      );
      console.log(response.ok);
      if (!response.ok) console.log("Server status: ", response.status);

      // console.log("API data send");
      const result = await response.text();

    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (data) => {
    saveData(data);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {/* register your input into the hook by invoking the "register" function */}
      <label>Name: </label>
      <input placeholder="Name..." {...register("Name", { required: true })} />

      <label>Email: </label>
      <input
        placeholder="E-mail..."
        {...register("Email", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" value="DODAJ UŻYTKOWNIKA" />
    </form>
  );
}
