const sendData = async (reqOptions) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/${process.env.API_TABLE_SUBS}?api_key=${process.env.API_KEY}`,
      reqOptions
    );
    const result = await response.text();
    return result;
  } catch (err) {
    console.error(err);
  }
  // try {
  //   const response = await fetch(
  //     `${process.env.API_URL}/${process.env.API_TABLE_SUBS}?api_key=${process.env.API_KEY}`,
  //     reqOptions
  //   );
  //   if (response.ok) {
  //     console.log("API data prepared");
  //     const result = await response.text();
  //     console.log("data send");
  //   } else {
  //     console.log("Server status: ", response.status);
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
};
export default sendData;