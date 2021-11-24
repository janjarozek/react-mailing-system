import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router";

import getCurrentDate from "../utils/getCurrentDate";
import "./AddCampaignForm.scss";

const CAMPAIGN_STATUS = ["Draft", "Error", "Sent"]

function AddCampaignForm( props ) {
  const { history } = props;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    saveData(data)
    setTimeout(() => history.push("/list-of-campaigns"), 500);
    // clearTimeout(setback);
  };

  const saveData = async (formData) => {
    var raw = JSON.stringify({
      records: [
        {
          fields: {
            Subject: formData.Subject,
            Status: formData.Status,
            Content: formData.Content,
            CreatedDate: getCurrentDate()
          }
        }
      ]
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      body: raw,
      redirect: "follow"
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_CAMP}`,
        requestOptions
      );
      console.log(response.ok);
      if (!response.ok) console.log("Server status: ", response.status);

      const result = await response.text();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {/* register your input into the hook by invoking the "register" function */}
      <label>Title: </label>
      <input
        placeholder="Subject..."
        {...register("Subject", { required: true })}
      />

      <label>Contents: </label>
      <textarea
        placeholder="Content..."
        {...register("Content", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <div className="form-select">
        <label>Status: </label>
        <select {...register("Status", { required: true })}>
          {CAMPAIGN_STATUS.map( status => (
            <option className="select-items" value={status}>{status}</option>
          ))}
        </select>
      </div>
      <input type="submit" value="DODAJ KAMPANIE" />
    </form>
  );
}

export default withRouter(AddCampaignForm);