
import { NavLink } from "react-router";
import DepositForm from "../../../../../components/DepositForm/DepositForm";
import { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthContext";

const DesktopDeposit = () => {
  const { userBalance,currency } = useContext(AuthContext);
 

  return (
    <>
      {/* Header */}
      <div>
        <div className="flex items-center m-6 bg-gray-700 p-4 rounded-lg">
          <div className="w-1/2">
            <p className="text-white">Main Wallet</p>
            <p className="text-green-400 text-xl font-bold">{currency} {userBalance}</p>
          </div>
          <div className="w-1/2">
            <p className="text-white">Security Level</p>
            <p className="text-green-400 font-bold">Safe</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="bg-gray-700 text-white m-6 p-6 rounded-lg w-11/16">
          {/* Tabs */}
          <div className="flex justify-between gap-2 mb-6 pb-3 border-b-2 border-dashed border-yellow-500">
            <div>
              <h3 className="text-yellow-500 font-bold border-l-2 text-2xl pl-2">
                Funds
              </h3>
            </div>
            <div>
              <NavLink
                className={({ isActive }) =>
                  `px-12 py-2 font-bold ${
                    isActive
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-500 text-white"
                  }`
                }
              >
                Deposit
              </NavLink>

              {/* Withdrawal */}
              <NavLink
                to="/profile/my-wallet/withdraw"
                className={({ isActive }) =>
                  `px-12 py-2  ${
                    isActive
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-500 text-white"
                  }`
                }
              >
                Withdrawal
              </NavLink>
            </div>
          </div>

          {/* Promotions */}
          <DepositForm></DepositForm>
        </div>
      </div>
    </>
  );
};

export default DesktopDeposit;
