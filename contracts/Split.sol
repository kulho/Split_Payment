// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SplitPayment {
    function splitEther(
        address payable[] calldata _addresses,
        uint256[] calldata _amounts
    ) external payable {
        require(
            _addresses.length == _amounts.length,
            "There must be same number of receivers as ammounts"
        );
        require(
            _addresses.length != 0,
            "You must provide at least one receiver"
        );
        require(
            getSum(_amounts) == msg.value,
            "Total ammout to be distributed must equal to number of ethers sent"
        );

        for (uint256 i = 0; i < _addresses.length; i++) {
            (bool sent, ) = _addresses[i].call{value: _amounts[i]}("");
            require(sent, "Failed to send Ether");
        }
    }

    function getSum(uint256[] calldata _amounts)
        private
        pure
        returns (uint256)
    {
        uint256 sum = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            sum = sum + _amounts[i];
        }
        return sum;
    }
}
