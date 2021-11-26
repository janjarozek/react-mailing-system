import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { getCampaigns } from '../redux.js'

function CampaignDetails( props ) {
    const { data, handleGoBackClick, history } = props;
    const handleDeleteCampaign = () => {
        // console.log(data.id)
        deleteData(data.id);
        // history.push("/list-of-campaigns");
        // handleGoBackClick();
    }

    const handleUpdateCampaign = () => {
        console.log(data);
        // updateData(data);
        // handleGoBackClick();
    }

    const updateData = async (formData) => {
        var raw = JSON.stringify({
            records: [
              {
                fields: {
                  Subject: formData.fields.Subject,
                  Status: formData.fields.Status,
                  Content: formData.fields.Content,
                  CreatedDate: formData.fields.CreatedDate
                }
              }
            ]
        });
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            body: raw,
            redirect: "follow"
        };

        console.log(raw);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_CAMP}/${formData.id}`
            , requestOptions);
            if (!response.ok) console.log("Server status: ", response.status);
            // const data = await response.json();
            // console.log("Campaign deleted", data);
            console.log("Campaign updated", formData.id);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteData = async (campaignId) => {
        let requestOptions = {
            method: "DELETE",
            headers: {
                // "Content-Type" : "application/json",
                "Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            redirect: "follow"
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_CAMP}/${campaignId}`
            , requestOptions);
            if (!response.ok) console.log("Server status: ", response.status);
            const data = await response.json();
            // console.log("Campaign deleted", data);
            console.log("Campaign deleted", campaignId);
            if (data) handleGoBackClick();
            // history.push("/list-of-campaigns");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="campaign-frame">
            <h6 className="campaign__small-date">Campaign created: {data.fields.CreatedDate}</h6>
            {/* <h4 className="campaign__subject">{data.fields.Subject}</h4> */}
            <input
                type="text"
                value={data.fields.Subject}
                className="campaign__subject"
            />
            <input
                type="textarea"
                value={data.fields.Content}
                className="campaign__content"
            />
            {/* <div className="form-select">
                <label>Status: </label>
                <select>
                {CAMPAIGN_STATUS.map( status => (
                    <option className="select-items" value={status}>{status}</option>
                ))}
                </select>
            </div> */}
            <button className="campaign__small-button" onClick={handleGoBackClick}>GO BACK</button>
            <button className="campaign__small-button" onClick={handleUpdateCampaign}>SAVE</button>
            <button className="campaign__small-button" onClick={handleDeleteCampaign}>DELETE</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CampaignDetails));