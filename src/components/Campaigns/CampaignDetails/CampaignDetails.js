import React from 'react'

export default function CampaignDetails({ data, handleGoBackClick }) {
    return (
        <div className="campaign-frame">
            <h6 className="campaign__small-date">Campaign created: {data.fields.CreatedDate}</h6>
            {/* <h4 className="campaign__subject">{data.fields.Subject}</h4> */}
            <input type="text" value={data.fields.Subject} className="campaign__subject" />
            <input type="textarea" value={data.fields.Content} className="campaign__content" />
            <button className="campaign__small-button" onClick={handleGoBackClick}>GO BACK</button>
            <button className="campaign__small-button" onClick={handleGoBackClick}>SAVE</button>
            <button className="campaign__small-button" onClick={handleGoBackClick}>DELETE</button>
        </div>
    )
}
