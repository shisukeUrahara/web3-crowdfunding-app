// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    //  state variables
    struct Campaign{
        address owner;
        string description;
        string title;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256=>Campaign) public campaigns;
    uint256 public campaignCount;

    //  constructor
    constructor(){}

    //  modifiers

    //  functions
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _target,
        uint256 _deadline
    ) public returns(uint256){
        Campaign storage newCampaign= campaigns[campaignCount];
        require(newCampaign.deadline<block.timestamp,"deadline should be from the future");

        newCampaign.owner=_owner;
        newCampaign.title=_title;
        newCampaign.description=_description;
        newCampaign.image=_image;
        newCampaign.target=_target;
        newCampaign.target=_target;
        newCampaign.amountCollected=0;

        campaignCount++;

        return campaignCount-1;

    }

    function donateToCampaign(uint256 _id) public payable{
        require(_id<campaignCount,"Invalid campaign id");
        uint256 amount=msg.value;
        Campaign storage currentCampaign = campaigns[_id];
        currentCampaign.donators.push(msg.sender);
        currentCampaign.donations.push(amount);

        (bool sent,)=payable(currentCampaign.owner).call{value:amount}("");
        if(sent){
            currentCampaign.amountCollected=currentCampaign.amountCollected+amount;
        }
    }

    function getDonators(uint256 _id) public view returns(address[] memory,uint256[] memory){
        return(campaigns[_id].donators,campaigns[_id].donations);
    }

    function getCampaigns()public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns= new Campaign[](campaignCount);

        for(uint i=0;i<allCampaigns.length;i++){
            Campaign storage currentCampaign= campaigns[i];
            allCampaigns[i]=currentCampaign;
        }

        return allCampaigns;
    }
}