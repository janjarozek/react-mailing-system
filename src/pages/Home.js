import React, { useEffect, useState } from "react";

require('dotenv').config();
// import asyncApi from "../components/utils/asyncAPI";

export default function Home() {
  const [apiData, setApiData] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        // `${process.env.API_URL}/${process.env.API_TABLE_SUBS}?api_key=${process.env.API_KEY}`
        "https://api.airtable.com/v0/appRqmnpD3qTn18Cc/ListOfSubs?api_key=keyEgyPm893dRucZN"
      );
      if (response.ok) {
        console.log("API data received");
        const data = await response.json();
        setApiData(data.records);
      } else {
        console.log("Server status: ", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <p>To jest strona domowa.</p>
      {!apiData && <p>Dane użytkowników są pobierane...</p>}
      {apiData && (
        <div>
          {apiData.map((elem) => (
            <div key={`name-${elem.id}`}>
              <p>Imię: {elem.fields.Name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
