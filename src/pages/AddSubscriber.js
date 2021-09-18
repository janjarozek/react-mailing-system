import React, { useEffect, useState } from "react";

import AddSubscriberForm from "../components/AddSubscriberForm";

export default function AddSubscriber() {
  return (
    <div>
      <p>Formularz dodawania użytkownika.</p>
      <AddSubscriberForm />
    </div>
  );
}
