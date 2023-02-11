import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { DisplayCampaigns } from '../components';


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x63584449b45f3764880f1dffbC487eAECba9959a');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.image,
                form.target,
                new Date(form.deadline).getTime()
            ])

            console.log("**@ campaign creation success , data is , ", data);
        }
        catch (err) {
            console.log("**@ campaign creation error , err is , ", err);


        }


    }

    const getCampaigns = async () => {
        const campaignData = await contract.call('getCampaigns');
        console.log("**@ getCampaign data is , ", campaignData);
        const parsedCampaigns = campaignData.map((campaign, index) => ({
            pid: index,
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatUnits(campaign.target.toString(), 18).toString(),
            deadline: campaign.deadline.toNumber(),
            amountCollected: campaign.amountCollected.toString(),
            image: campaign.image
        }));

        console.log("**@ parsedCampaigns data is , ", parsedCampaigns);
        return parsedCampaigns



    }

    const getUserCampaigns = async () => {
        const campaigns = await getCampaigns();
        const filteredCampaigns = campaigns.filter((campaign) => campaign.owner === address);
        console.log("**@ filtered Campaigns are , ", filteredCampaigns)
        return filteredCampaigns
    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            CreateCampaign: publishCampaign,
            connect,
            getCampaigns,
            getUserCampaigns
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);