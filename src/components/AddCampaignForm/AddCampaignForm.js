import React from "react";
import { useForm } from "react-hook-form";

import "./AddCampaignForm.scss";

export default function AddCampaignForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const onSave = (data) => console.log(data);

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

      <input
        type="button"
        onClick={handleSubmit(onSave)}
        value="DODAJ KAMPANIE"
      />
      <input type="submit" value="WYŚLIJ KAMPANIE" />
    </form>
  );
}
