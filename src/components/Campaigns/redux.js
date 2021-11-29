// action creator definitions API
const CAMPAIGN_API_REQUESTED = 'campaign/CAMPAIGN_API_REQUESTED'
const CAMPAIGN_API_SUCCEED = 'campaign/CAMPAIGN_API_SUCCEED'
const CAMPAIGN_API_DELETE_SUCCEED = 'campaign/CAMPAIGN_API_DELETE_SUCCEED'
const CAMPAIGN_API_UPDATE_SUCCEED = 'campaign/CAMPAIGN_API_UPDATE_SUCCEED'
const CAMPAIGN_API_FAILED = 'campaign/CAMPAIGN_API_FAILED'

// state
const INITIAL_STATE = {
    storeCampaigns: null,
    isLoading: false,
    isError: false
}

// actions creators
const campaignRequest = () => ({ type: CAMPAIGN_API_REQUESTED})
const campaignSucceed = data => ({ type: CAMPAIGN_API_SUCCEED, payload: data})
const campaignDeleteSucceed = () => ({ type: CAMPAIGN_API_DELETE_SUCCEED })
const campaignUpdateSucceed = () => ({ type: CAMPAIGN_API_UPDATE_SUCCEED })
const campaignFailed = () => ({ type: CAMPAIGN_API_FAILED})

export const getCampaigns = () => {
    return async function(dispatch){
        dispatch(campaignRequest());
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_CAMP}?api_key=${process.env.REACT_APP_API_KEY}`
          );
        if ( !response.ok ) dispatch(campaignFailed());

        const data = await response.json();
        dispatch(campaignSucceed(data.records));
    }
}

export const deleteCampaign = (campaignId) => {
    return async function(dispatch) {
        dispatch(campaignRequest());
        let requestOptions = {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            redirect: "follow"
        };
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_CAMP}/${campaignId}`
        , requestOptions);
        if (!response.ok) dispatch(campaignFailed());
        const data = await response.json();
        console.log("Campaign deleted", campaignId);
        if (data) dispatch(campaignDeleteSucceed());
    }
}

export const updateCampaign = (campaignData, campaignId) => {
    return async function(dispatch) {
        dispatch(campaignRequest());
        var raw = JSON.stringify({
            fields: {
                Subject: campaignData.Subject,
                Status: campaignData.Status,
                Content: campaignData.Content,
                CreatedDate: campaignData.CreatedDate,
            }
        });

        const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: raw,
        redirect: "follow"
        };
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_TABLE_CAMP}/${campaignId}`,
            requestOptions
        );
        console.log(response.ok);
        if (!response.ok) dispatch(campaignFailed());

        const done = await response.text();
        if (done) dispatch(campaignUpdateSucceed());
    }
};

// reducer
export default function campaignReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case CAMPAIGN_API_REQUESTED:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case CAMPAIGN_API_SUCCEED:
            return {
                ...state,
                isLoading: false,
                storeCampaigns: action.payload,
                isError: false
            };
        case CAMPAIGN_API_DELETE_SUCCEED:
            return {
                ...state,
                isLoading: false,
                isError: false
            };
        case CAMPAIGN_API_UPDATE_SUCCEED:
            return {
                ...state,
                isLoading: false,
                isError: false
            };
        case CAMPAIGN_API_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default: return state;
    }

}