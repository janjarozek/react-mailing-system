import React, { useState } from "react";

import asyncAPI from "../utils/asyncAPI";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(null);

  try {
    asyncAPI
      // .get(`${process.env.API_TABLE_CAMP}?api_key=${process.env.API_KEY}`)
      .get(
        "https://api.airtable.com/v0/appRqmnpD3qTn18Cc/Campaigns?api_key=keyEgyPm893dRucZN"
      )
      .then((data) => setCampaigns(data));
  } catch (err) {
    console.log(err);
  }
  return <div>aslkaslk</div>;
}
