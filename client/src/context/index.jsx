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
            pId: index,
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatUnits(campaign.target.toString(), 18).toString(),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatUnits(campaign.amountCollected.toString(), 18).toString(),
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

    const donateToCampaign = async (pId, amount) => {
        console.log("**@ donateToCampaign called with pId ", pId);
        console.log("**@ donateToCampaign called with amount ", amount);

        const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount) });
        return data;
    }

    const getDonations = async (pId) => {
        console.log("**@ getDonations called with pid . ", pId);
        const donations = await contract.call('getDonators', pId);
        console.log("**@ getDonations called donations is ,  ", donations);

        const numberOfDonators = donations[0].length;
        console.log("**@ getDonations called numberOfDonators is ,  ", numberOfDonators);


        const parsedDonations = [];

        for (let i = 0; i < numberOfDonators; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatUnits(donations[1][i].toString(), 18)
            })
        }

        console.log("**@ before returning parsedDonations is , ", parsedDonations)

        return parsedDonations;

    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            CreateCampaign: publishCampaign,
            connect,
            getCampaigns,
            getUserCampaigns,
            donateToCampaign,
            getDonations
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);