import React, { useEffect, useState } from "react";

export default function Home() {
  const [apiData, setApiData] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_SUBS}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      if (!response.ok) console.log("Server status: ", response.status);

      console.log("API data subscribers received");
      const data = await response.json();
      setApiData(data.records);
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
