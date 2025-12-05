import React from 'react';
import DepositFormSettings from '../../components/DepositFormSettings/DepositFormSettings';
import DepositPaymentSetting from '../../components/DepositPaymentSetting/DepositPaymentSetting';

const GeneralSetting = () => {
    return (
        <div>
            <DepositFormSettings></DepositFormSettings>
            <DepositPaymentSetting></DepositPaymentSetting>
        </div>
    );
};

export default GeneralSetting;