import React, { useEffect, useState } from "react";

import ListOfCampaigns from "./ListOfCampaigns";
import CampaignDetails from "./CampaignDetails";

import './Campaigns.scss'

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(null);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCampaignItemClick = (e) => {
    campaigns.forEach(element => {
      if (element.id === e.target.id) return setCurrentCampaign(element);
    });
    // setCurrentCampaign(campaigns[e.target.id])
    setShowDetails(true);
  }
  const handleGoBackClick = () => {
    setShowDetails(false);
  }
  const handleDeleteClick = () => {
    console.log('del')
    // setShowDetails(false);
  }
  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_CAMP}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      if (!response.ok) console.log("Server status: ", response.status);

      console.log("API data campaigns received");
      const data = await response.json();
      setCampaigns(data.records);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // const waitSecond = setTimeout(() =>
    // { getData(); }, 1000);
    getData();
    // return clearTimeout(waitSecond);
  // }, [campaigns]) // this end in a loop of constant refreshment
  }, [showDetails])

  return (
    <div>
      {!campaigns && <p>Loading data ...</p>}
      {(campaigns && !showDetails) && <ListOfCampaigns>
        {campaigns.map( (campaign) => (
          <li key={`${campaign.id}`} className="campaign-frame">
            <h6 className="campaign__small-date">{campaign.fields.CreatedDate}</h6>
            <h4 className="campaign__subject">{campaign.fields.Subject}</h4>
            <p className="campaign__content">{campaign.fields.Content}</p>
            <button id={`${campaign.id}`} className="campaign__small-button" onClick={handleCampaignItemClick}>EDIT</button>
          </li>
        ))}
      </ListOfCampaigns>}
      {showDetails &&
        <CampaignDetails
          data={currentCampaign}
          handleGoBackClick={handleGoBackClick}
        />}
    </div>
  )
}
