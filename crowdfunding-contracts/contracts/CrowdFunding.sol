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

    //  modifiers

    //  functions
    function createCampaign(
        address _owner,
        string memory title,
        string memory _description,
        string memory _image,
        uint256 _target,
        uint256 _deadline,

    ) public returns(uint256){
        Campaign storage newCampaign= campaigns[campaignCount];
        require(newCampaign.timestamp<block.timestamp,"deadline should be from the future");

        newCampaign.owner=_owner;
        newCampaign.title=_title;
        newCampaign.description=_description;
        newCampaign.image=_image;
        newCampaign.target=_target;
        newCampaign.target=_target;
        newCampaign.amountCollected=0;

        campaignCount++;

        return campaignCount-1;

    };

    function donateToCampaign(){};
    function getDonators(){};
    function getCampaigns(){};
}