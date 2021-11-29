import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { getCampaigns } from './redux'

import ListOfCampaigns from "./ListOfCampaigns";
import CampaignDetails from "./CampaignDetails";

import './Campaigns.scss'

function Campaigns( props ) {
  const { storeCampaigns, isLoading, isError, getCampaigns } = props;
  // const [campaigns, setCampaigns] = useState(null);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleChangeSubject = e => {
    const newSubject = { ...currentCampaign }
    newSubject.fields.Subject = e.target.value
    setCurrentCampaign({
      ...currentCampaign,
      ...newSubject
    })
  }
  const handleChangeStatus = e => {
    const newStatus = { ...currentCampaign }
    newStatus.fields.Status = e.target.value
    setCurrentCampaign({
      ...currentCampaign,
      ...newStatus
    })
    // setCurrentCampaign({
    //   "id": currentCampaign.id,
    //   "fields": {
    //       "Content": currentCampaign.Content,
    //       "Subject": currentCampaign.Subject,
    //       "CreatedDate": currentCampaign.CreatedDate,
    //       "Status": e.target.value,
    //   },
    //   "createdTime": currentCampaign.createdTime
    // })
  }
  const handleChangeContent = e => {
    const newContent = { ...currentCampaign }
    newContent.fields.Content = e.target.value
    setCurrentCampaign({
      ...currentCampaign,
      ...newContent
    })
  }

  const handleCampaignItemClick = (e) => {
    storeCampaigns.forEach(element => {
      if (element.id === e.target.id) return setCurrentCampaign(element);
    });
    setShowDetails(true);
  }
  const handleGoBackClick = () => {
    setShowDetails(false);
  }

  useEffect(() => {
    getCampaigns();
  }, [showDetails])

  return (
    <div>
      {isLoading && <p>Loading data ...</p>}
      {(storeCampaigns && !showDetails) && <ListOfCampaigns>
        {storeCampaigns.map( (campaign) => (
          <li key={`${campaign.id}`} className={`campaign-frame status-${campaign.fields.Status}`}>
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
          handleChangeSubject={handleChangeSubject}
          handleChangeContent={handleChangeContent}
          handleChangeStatus={handleChangeStatus}
          handleGoBackClick={handleGoBackClick}
        />}
    </div>
  )
}

function mapStateToProps(state) {
  return{
      storeCampaigns: state.campReducer.storeCampaigns,
      isLoading: state.campReducer.isLoading,
      isError: state.campReducer.isError
  }
}
function mapDispatchToProps(dispatch) {
  return{
    getCampaigns: () => dispatch(getCampaigns())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);