import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';


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

    return (
        <StateContext.Provider value={{
            address,
            contract,
            CreateCampaign: publishCampaign,
            connect
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);