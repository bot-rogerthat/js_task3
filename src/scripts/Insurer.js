"use strict";
function Insurer(insuranceType, policyNumber, name, dataPicker, premium, discount) {
    this._id = 0;
    this._insuranceType = insuranceType;
    this._policyNumber = policyNumber;
    this._name = name;
    this._dataPicker = dataPicker;
    this._premium = premium;
    this._discount = discount;
}