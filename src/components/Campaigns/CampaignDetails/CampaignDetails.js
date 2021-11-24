import React from 'react'
import { withRouter } from 'react-router';

function CampaignDetails({ data, handleGoBackClick, history }) {
    const handleDeleteCampaign = () => {
        // console.log(data.id)
        deleteData(data.id);
        // history.push("/list-of-campaigns");
        handleGoBackClick();
    }

    const deleteData = async (campaignId) => {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    // "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`
                },
                redirect: "follow"
            };
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_CAMP}/${campaignId}`
            , requestOptions);
            if (!response.ok) console.log("Server status: ", response.status);
            // const data = await response.json();
            // console.log("Campaign deleted", data);
            console.log("Campaign deleted", campaignId);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="campaign-frame">
            <h6 className="campaign__small-date">Campaign created: {data.fields.CreatedDate}</h6>
            {/* <h4 className="campaign__subject">{data.fields.Subject}</h4> */}
            <input type="text" value={data.fields.Subject} className="campaign__subject" />
            <input type="textarea" value={data.fields.Content} className="campaign__content" />
            <button className="campaign__small-button" onClick={handleGoBackClick}>GO BACK</button>
            <button className="campaign__small-button" onClick={handleGoBackClick}>SAVE</button>
            <button className="campaign__small-button" onClick={handleDeleteCampaign}>DELETE</button>
        </div>
    )
}
export default withRouter(CampaignDetails);