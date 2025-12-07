import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import Profile from "../pages/Profile/Profile";
import Account from "../pages/Account/Account";
import Sports from "../pages/Sports/Sports";
import PlayIn from "../pages/PlayIn/PlayIn";
import Multi from "../pages/Multi/Multi";
import WalletLayout from "../layouts/WalletLayout";
import DekstopMyProfile from "../pages/Account/ProfilePages/DekstopMyProfile";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import MyBets from "../pages/MyBets/MyBets";
import MobileAccount from "../pages/Account/MobileAccount/MobileAccount";
import Withdraw from "../pages/Account/MyWallet/Withdraw/Withdraw";
import Deposit from "../pages/Account/MyWallet/Diposit/Deposite";
import BillingLayout from "../layouts/BillingLayout";
import Sattled from "../pages/Account/BillingRecords/Sattled/Sattled";
import Unsattled from "../pages/Account/BillingRecords/Unsattled/Unsattled";
import ResetPassword from "../pages/Account/ResetPassword/ResetPassword";
import Inbox from "../pages/Account/Inbox/Inbox";
import Transaction from "../pages/Account/Transaction Records/Transaction";
import VIPLayout from "../layouts/VIPLayout";
import MYVIP from "../pages/Account/VIP/MyVIP/MYVIP";
import VIPReceived from "../pages/Account/VIP/VIPReceived/VIPReceived";
import VIPUsed from "../pages/Account/VIP/VIPUsed/VIPUsed";
import VIPHistory from "../pages/Account/VIP/VIPHistory/VIPHIstory";
import Transactions from "../pages/Account/MobileAccount/Transactions/Transactions";
import RealWalletLayout from "../layouts/RealWalletLayout";
import Rewards from "../pages/Account/MobileAccount/Rewards/Rewards";
import VIPs from "../pages/Account/MobileAccount/VIPs/VIPs";
import Referral from "../pages/Account/MobileAccount/Referral/Referral";
import PL from "../pages/Account/MobileAccount/PL/PL";
import Completed from "../pages/Account/MobileAccount/Completed/Completed";
import Bonus from "../pages/Account/MobileAccount/Bonus/Bonus";
import Active from "../pages/Account/MobileAccount/Active/Active";
import PLAll from "../pages/Account/MobileAccount/PL/PLAll/PLAll";
import PLLayout from "../layouts/PLLayout";
import PLAccount from "../pages/Account/MobileAccount/PL/PLAccount/PLAccount";
import ParleyRecords from "../pages/Account/ParleyRecords/ParleyRecords";
import AdminLayout from "../Admindashboard/layouts/AdminLayout";
import AdHome from "../Admindashboard/pages/AdHome/AdHome";
import MyAccount from "../Admindashboard/pages/MyAccount/MyAccount";
import BetList from "../Admindashboard/pages/BetList/BetList";
import User from "../Admindashboard/pages/User/User";
import SubAgent from "../Admindashboard/pages/SubAgent/SubAgent";
import Agent from "../Admindashboard/pages/Agent/Agent";
import Master from "../Admindashboard/pages/Master/Master";
import SubAdmin from "../Admindashboard/pages/SubAdmin/SubAdmin";
import Admin from "../Admindashboard/pages/Admin/Admin";
import GeneralSetting from "../Admindashboard/pages/GeneralSetting/GeneralSetting";
import AdminSetting from "../Admindashboard/pages/AdminSetting/AdminSetting";
import GameApiKey from "../Admindashboard/pages/GameApiKey/GameApiKey";
import HomeControl from "../Admindashboard/pages/HomeControl/HomeControl";
import ColorControl from "../Admindashboard/pages/ColorControl/ColorControl";
import LiveGame from "../Admindashboard/pages/LiveGame/LiveGame";
import ActiveGame from "../Admindashboard/pages/ActiveGame/ActiveGame";
import DeactiveGame from "../Admindashboard/pages/DeactiveGame/DeactiveGame";
import GameFileImport from "../Admindashboard/pages/GameFileImport/GameFileImport";
import ApiImport from "../Admindashboard/pages/ApiImport/ApiImport";
import PragmaticPlay from "../Admindashboard/pages/PragmaticPlay/PragmaticPlay";
import Evolution from "../Admindashboard/pages/Evolution/Evolution";
import BGaming from "../Admindashboard/pages/BGaming/BGaming";
import Amusnet from "../Admindashboard/pages/Amusnet/Amusnet";
import PGSoft from "../Admindashboard/pages/PGSoft/PGSoft";
import PlayAndGo from "../Admindashboard/pages/PlayAndGo/PlayAndGo";
import PlayTech from "../Admindashboard/pages/PlayTech/PlayTech";
import NoLimitCity from "../Admindashboard/pages/NoLimitCity/NoLimitCity";
import HackSaw from "../Admindashboard/pages/HackSaw/HackSaw";
import BetListLive from "../Admindashboard/pages/BetListLive/BetListLive";
import Banking from "../Admindashboard/pages/Banking/Banking";
import Message from "../Admindashboard/pages/Message/Message";
import RiskManagement from "../Admindashboard/pages/RiskManagement/RiskManagement";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import PrivateRoute from "../routes/PrivateRoute";
import Statement from "../Admindashboard/components/Statement/Statement";
import Summary from "../Admindashboard/components/Summary/Summary";
import AdminProfile from "../Admindashboard/components/AdminProfile/AdminProfile";
import AccountDetails from "../Admindashboard/components/AccountDetails/AccountDetails";
import ModifyProfile from "../Admindashboard/pages/ModifyProfile/ModifyProfile";
import Activelog from "../Admindashboard/components/Activelog/Activelog";
import DepositPage from "../pages/Account/MyWallet/Diposit/Components/Deposit";
import CheckUserPayment from "../Admindashboard/components/CheckUserPayment/CheckUserPayment";
import DepositHistory from "../Admindashboard/pages/DepositHistory/DepositHistory";
import SubAdminLogin from "../pages/SubAdminLogin/SubAdminLogin";
import MasterLogin from "../pages/MasterLogin/MasterLogin";
import AgentLogin from "../pages/AgentLogin/AgentLogin";
import SubAgentLogin from "../pages/SubAgentLogin/SubAgentLogin";
import SubAdminPrivateRoute from "../routes/SubAdminPrivateRoute";
import MasterPrivateRoute from "../routes/MasterPrivateRoute";
import AgentPrivateRoute from "../routes/AgentPrivateRoute";
import SubAgentPrivateRoute from "../routes/SubAgentPrivateRoute";
import AddGameCategory from "../Admindashboard/pages/AddGameCategory/AddGameCategory";
import AddGame from "../Admindashboard/pages/AddGame/AddGame";
import TransactionHistory from "../Admindashboard/pages/TransactionHistory/TransactionHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "profile",
        Component: Profile,
        children: [
          {
            index: true,
            Component: DekstopMyProfile,
          },
          // {
          //   path: "my-wallet",
          //   Component: WalletLayout,
          //   children: [
          //     {
          //       index: true,
          //       Component: Deposit,
          //     },
          //     {
          //       path: "withdraw",
          //       Component: Withdraw,
          //     },
          //   ],
          // },
          {
            path: "billing-records",
            Component: BillingLayout,
            children: [
              {
                index: true,
                Component: Sattled,
              },
              {
                path: "unsettled",
                Component: Unsattled,
              },
            ],
          },
          {
            path: "vip",
            Component: VIPLayout,
            children: [
              {
                index: true,
                Component: MYVIP,
              },
              {
                path: "vip-received",
                Component: VIPReceived,
              },
              {
                path: "vip-used",
                Component: VIPUsed,
              },
              {
                path: "vip-history",
                Component: VIPHistory,
              },
            ],
          },
          {
            path: "reset-password",
            Component: ResetPassword,
          },
          {
            path: "inbox",
            Component: Inbox,
          },
          {
            path: "transaction-records",
            Component: Transaction,
          },
          {
            path: "real-wallet",
            Component: RealWalletLayout,
            children: [
              {
                path: "transactions",
                Component: Transactions,
              },
              {
                path: "rewards",
                Component: Rewards,
              },
              {
                path: "vips",
                Component: VIPs,
              },
              {
                path: "referral",
                Component: Referral,
              },
              {
                path: "pl",
                Component: PLLayout,
                children: [
                  {
                    path: "pl-all",
                    Component: PLAll,
                  },
                  {
                    path: "p-l",
                    Component: PL,
                  },
                  {
                    path: "pl-account",
                    Component: PLAccount,
                  },
                ],
              },
              {
                path: "completed",
                Component: Completed,
              },
              {
                path: "bonus",
                Component: Bonus,
              },
              {
                path: "active",
                Component: Active,
              },
            ],
          },
          {
            path: "parley-records",
            Component: ParleyRecords,
          },
        ],
      },
      {
        path: "account",
        Component: Account,
      },
      {
        path: "sports",
        Component: Sports,
      },
      {
        path: "play-in",
        Component: PlayIn,
      },
      {
        path: "multi",
        Component: Multi,
      },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "my-bets",
        Component: MyBets,
      },
    ],
  },
  {
    path: "my-account",
    Component: MobileAccount,
  },
  {
    path: "admin-login",
    element: <AdminLogin />,
  },
  {
    path: "sub-admin-login",
    element: <SubAdminLogin />,
  },
  {
    path: "master-login",
    element: <MasterLogin />,
  },
  {
    path: "agent-login",
    element: <AgentLogin />,
  },
  {
    path: "sub-agent-login",
    element: <SubAgentLogin />,
  },
  // Mother Admin Dashboard
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdHome /> },
      {
        path: "my-account",

        element: <MyAccount />,
        children: [
          {
            path: "statement",
            element: <Statement></Statement>,
          },
          {
            path: "summary",
            element: <Summary></Summary>,
          },
          {
            path: "profile",
            element: <AdminProfile></AdminProfile>,
          },
          {
            path: "active-log",
            element: <Activelog></Activelog>,
          },
          {
            path: "account-details",
            element: <AccountDetails></AccountDetails>,
          },
        ],
      },
      {
        path: "bet-lists",
        element: <BetList />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "sub-agent",
        element: <SubAgent />,
      },
      {
        path: "agent",
        element: <Agent />,
      },
      {
        path: "master",
        element: <Master />,
      },
      {
        path: "sub-admin",
        element: <SubAdmin />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "general-setting",
        element: <GeneralSetting />,
      },
      {
        path: "admin-setting",
        element: <AdminSetting />,
      },
      {
        path: "game-api-key",
        element: <GameApiKey />,
      },
      {
        path: "home-control",
        element: <HomeControl />,
      },
      {
        path: "color-control",
        element: <ColorControl />,
      },
      {
        path: "add-game-category",
        element: <AddGameCategory />,
      },
      {
        path: "add-game",
        element: <AddGame />,
      },
      {
        path: "live-game",
        element: <LiveGame />,
      },
      {
        path: "active-game",
        element: <ActiveGame />,
      },
      {
        path: "deactive-game",
        element: <DeactiveGame />,
      },
      {
        path: "game-file-import",
        element: <GameFileImport />,
      },
      {
        path: "api-import",
        element: <ApiImport />,
      },
      {
        path: "progmatic-play",
        element: <PragmaticPlay />,
      },
      {
        path: "evolution",
        element: <Evolution />,
      },
      {
        path: "b-gaming",
        element: <BGaming />,
      },
      {
        path: "amusnet",
        element: <Amusnet />,
      },
      {
        path: "pg-soft",
        element: <PGSoft />,
      },
      {
        path: "play-and-go",
        element: <PlayAndGo />,
      },
      {
        path: "play-tech",
        element: <PlayTech />,
      },
      {
        path: "no-limit-city",
        element: <NoLimitCity />,
      },
      {
        path: "hack-saw",
        element: <HackSaw />,
      },
      {
        path: "bet-list-live",
        element: <BetListLive />,
      },
      {
        path: "banking",
        element: <Banking />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "risk-management",
        element: <RiskManagement />,
      },
      {
        path: "modify-profile/:id",
        element: <ModifyProfile></ModifyProfile>,
      },
      {
        path: "check-users-payment",
        element: <CheckUserPayment></CheckUserPayment>,
      },
      {
        path: "deposit-history",
        element: <DepositHistory></DepositHistory>,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },
    ],
  },
  // Sub Admin Dashboard
  {
    path: "sub-admin-dashboard",
    element: (
      <SubAdminPrivateRoute>
        <AdminLayout />
      </SubAdminPrivateRoute>
    ),
    children: [
      { index: true, element: <AdHome /> },
      {
        path: "my-account",

        element: <MyAccount />,
        children: [
          {
            path: "statement",
            element: <Statement></Statement>,
          },
          {
            path: "summary",
            element: <Summary></Summary>,
          },
          {
            path: "profile",
            element: <AdminProfile></AdminProfile>,
          },
          {
            path: "active-log",
            element: <Activelog></Activelog>,
          },
          {
            path: "account-details",
            element: <AccountDetails></AccountDetails>,
          },
        ],
      },
      {
        path: "bet-lists",
        element: <BetList />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "sub-agent",
        element: <SubAgent />,
      },
      {
        path: "agent",
        element: <Agent />,
      },
      {
        path: "master",
        element: <Master />,
      },
      {
        path: "sub-admin",
        element: <SubAdmin />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "general-setting",
        element: <GeneralSetting />,
      },
      {
        path: "admin-setting",
        element: <AdminSetting />,
      },
      {
        path: "game-api-key",
        element: <GameApiKey />,
      },
      {
        path: "home-control",
        element: <HomeControl />,
      },
      {
        path: "color-control",
        element: <ColorControl />,
      },
      {
        path: "add-game-category",
        element: <AddGameCategory />,
      },
      {
        path: "live-game",
        element: <LiveGame />,
      },
      {
        path: "active-game",
        element: <ActiveGame />,
      },
      {
        path: "deactive-game",
        element: <DeactiveGame />,
      },
      {
        path: "game-file-import",
        element: <GameFileImport />,
      },
      {
        path: "api-import",
        element: <ApiImport />,
      },
      {
        path: "progmatic-play",
        element: <PragmaticPlay />,
      },
      {
        path: "evolution",
        element: <Evolution />,
      },
      {
        path: "b-gaming",
        element: <BGaming />,
      },
      {
        path: "amusnet",
        element: <Amusnet />,
      },
      {
        path: "pg-soft",
        element: <PGSoft />,
      },
      {
        path: "play-and-go",
        element: <PlayAndGo />,
      },
      {
        path: "play-tech",
        element: <PlayTech />,
      },
      {
        path: "no-limit-city",
        element: <NoLimitCity />,
      },
      {
        path: "hack-saw",
        element: <HackSaw />,
      },
      {
        path: "bet-list-live",
        element: <BetListLive />,
      },
      {
        path: "banking",
        element: <Banking />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "risk-management",
        element: <RiskManagement />,
      },
      {
        path: "modify-profile/:id",
        element: <ModifyProfile></ModifyProfile>,
      },
      {
        path: "check-users-payment",
        element: <CheckUserPayment></CheckUserPayment>,
      },
      {
        path: "deposit-history",
        element: <DepositHistory></DepositHistory>,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },
    ],
  },
  // Master Admin Dashboard
  {
    path: "master-dashboard",
    element: (
      <MasterPrivateRoute>
        <AdminLayout />
      </MasterPrivateRoute>
    ),
    children: [
      { index: true, element: <AdHome /> },
      {
        path: "my-account",

        element: <MyAccount />,
        children: [
          {
            path: "statement",
            element: <Statement></Statement>,
          },
          {
            path: "summary",
            element: <Summary></Summary>,
          },
          {
            path: "profile",
            element: <AdminProfile></AdminProfile>,
          },
          {
            path: "active-log",
            element: <Activelog></Activelog>,
          },
          {
            path: "account-details",
            element: <AccountDetails></AccountDetails>,
          },
        ],
      },
      {
        path: "bet-lists",
        element: <BetList />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "sub-agent",
        element: <SubAgent />,
      },
      {
        path: "agent",
        element: <Agent />,
      },
      {
        path: "master",
        element: <Master />,
      },
      {
        path: "sub-admin",
        element: <SubAdmin />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "general-setting",
        element: <GeneralSetting />,
      },
      {
        path: "admin-setting",
        element: <AdminSetting />,
      },
      {
        path: "game-api-key",
        element: <GameApiKey />,
      },
      {
        path: "home-control",
        element: <HomeControl />,
      },
      {
        path: "color-control",
        element: <ColorControl />,
      },
      {
        path: "add-game-category",
        element: <AddGameCategory />,
      },
      {
        path: "live-game",
        element: <LiveGame />,
      },
      {
        path: "active-game",
        element: <ActiveGame />,
      },
      {
        path: "deactive-game",
        element: <DeactiveGame />,
      },
      {
        path: "game-file-import",
        element: <GameFileImport />,
      },
      {
        path: "api-import",
        element: <ApiImport />,
      },
      {
        path: "progmatic-play",
        element: <PragmaticPlay />,
      },
      {
        path: "evolution",
        element: <Evolution />,
      },
      {
        path: "b-gaming",
        element: <BGaming />,
      },
      {
        path: "amusnet",
        element: <Amusnet />,
      },
      {
        path: "pg-soft",
        element: <PGSoft />,
      },
      {
        path: "play-and-go",
        element: <PlayAndGo />,
      },
      {
        path: "play-tech",
        element: <PlayTech />,
      },
      {
        path: "no-limit-city",
        element: <NoLimitCity />,
      },
      {
        path: "hack-saw",
        element: <HackSaw />,
      },
      {
        path: "bet-list-live",
        element: <BetListLive />,
      },
      {
        path: "banking",
        element: <Banking />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "risk-management",
        element: <RiskManagement />,
      },
      {
        path: "modify-profile/:id",
        element: <ModifyProfile></ModifyProfile>,
      },
      {
        path: "check-users-payment",
        element: <CheckUserPayment></CheckUserPayment>,
      },
      {
        path: "deposit-history",
        element: <DepositHistory></DepositHistory>,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },
    ],
  },
  // Agent Dashboard
  {
    path: "agent-dashboard",
    element: (
      <AgentPrivateRoute>
        <AdminLayout />
      </AgentPrivateRoute>
    ),
    children: [
      { index: true, element: <AdHome /> },
      {
        path: "my-account",

        element: <MyAccount />,
        children: [
          {
            path: "statement",
            element: <Statement></Statement>,
          },
          {
            path: "summary",
            element: <Summary></Summary>,
          },
          {
            path: "profile",
            element: <AdminProfile></AdminProfile>,
          },
          {
            path: "active-log",
            element: <Activelog></Activelog>,
          },
          {
            path: "account-details",
            element: <AccountDetails></AccountDetails>,
          },
        ],
      },
      {
        path: "bet-lists",
        element: <BetList />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "sub-agent",
        element: <SubAgent />,
      },
      {
        path: "agent",
        element: <Agent />,
      },
      {
        path: "master",
        element: <Master />,
      },
      {
        path: "sub-admin",
        element: <SubAdmin />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "general-setting",
        element: <GeneralSetting />,
      },
      {
        path: "admin-setting",
        element: <AdminSetting />,
      },
      {
        path: "game-api-key",
        element: <GameApiKey />,
      },
      {
        path: "home-control",
        element: <HomeControl />,
      },
      {
        path: "color-control",
        element: <ColorControl />,
      },
      {
        path: "add-game-category",
        element: <AddGameCategory />,
      },
      {
        path: "live-game",
        element: <LiveGame />,
      },
      {
        path: "active-game",
        element: <ActiveGame />,
      },
      {
        path: "deactive-game",
        element: <DeactiveGame />,
      },
      {
        path: "game-file-import",
        element: <GameFileImport />,
      },
      {
        path: "api-import",
        element: <ApiImport />,
      },
      {
        path: "progmatic-play",
        element: <PragmaticPlay />,
      },
      {
        path: "evolution",
        element: <Evolution />,
      },
      {
        path: "b-gaming",
        element: <BGaming />,
      },
      {
        path: "amusnet",
        element: <Amusnet />,
      },
      {
        path: "pg-soft",
        element: <PGSoft />,
      },
      {
        path: "play-and-go",
        element: <PlayAndGo />,
      },
      {
        path: "play-tech",
        element: <PlayTech />,
      },
      {
        path: "no-limit-city",
        element: <NoLimitCity />,
      },
      {
        path: "hack-saw",
        element: <HackSaw />,
      },
      {
        path: "bet-list-live",
        element: <BetListLive />,
      },
      {
        path: "banking",
        element: <Banking />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "risk-management",
        element: <RiskManagement />,
      },
      {
        path: "modify-profile/:id",
        element: <ModifyProfile></ModifyProfile>,
      },
      {
        path: "check-users-payment",
        element: <CheckUserPayment></CheckUserPayment>,
      },
      {
        path: "deposit-history",
        element: <DepositHistory></DepositHistory>,
      },
      ,
      {
        path: "transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },
    ],
  },
  // sub-agent Dashboard
  {
    path: "sub-agent-dashboard",
    element: (
      <SubAgentPrivateRoute>
        <AdminLayout />
      </SubAgentPrivateRoute>
    ),
    children: [
      { index: true, element: <AdHome /> },
      {
        path: "my-account",

        element: <MyAccount />,
        children: [
          {
            path: "statement",
            element: <Statement></Statement>,
          },
          {
            path: "summary",
            element: <Summary></Summary>,
          },
          {
            path: "profile",
            element: <AdminProfile></AdminProfile>,
          },
          {
            path: "active-log",
            element: <Activelog></Activelog>,
          },
          {
            path: "account-details",
            element: <AccountDetails></AccountDetails>,
          },
        ],
      },
      {
        path: "bet-lists",
        element: <BetList />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "sub-agent",
        element: <SubAgent />,
      },
      {
        path: "agent",
        element: <Agent />,
      },
      {
        path: "master",
        element: <Master />,
      },
      {
        path: "sub-admin",
        element: <SubAdmin />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "general-setting",
        element: <GeneralSetting />,
      },
      {
        path: "admin-setting",
        element: <AdminSetting />,
      },
      {
        path: "game-api-key",
        element: <GameApiKey />,
      },
      {
        path: "home-control",
        element: <HomeControl />,
      },
      {
        path: "color-control",
        element: <ColorControl />,
      },
      {
        path: "add-game-category",
        element: <AddGameCategory />,
      },
      {
        path: "live-game",
        element: <LiveGame />,
      },
      {
        path: "active-game",
        element: <ActiveGame />,
      },
      {
        path: "deactive-game",
        element: <DeactiveGame />,
      },
      {
        path: "game-file-import",
        element: <GameFileImport />,
      },
      {
        path: "api-import",
        element: <ApiImport />,
      },
      {
        path: "progmatic-play",
        element: <PragmaticPlay />,
      },
      {
        path: "evolution",
        element: <Evolution />,
      },
      {
        path: "b-gaming",
        element: <BGaming />,
      },
      {
        path: "amusnet",
        element: <Amusnet />,
      },
      {
        path: "pg-soft",
        element: <PGSoft />,
      },
      {
        path: "play-and-go",
        element: <PlayAndGo />,
      },
      {
        path: "play-tech",
        element: <PlayTech />,
      },
      {
        path: "no-limit-city",
        element: <NoLimitCity />,
      },
      {
        path: "hack-saw",
        element: <HackSaw />,
      },
      {
        path: "bet-list-live",
        element: <BetListLive />,
      },
      {
        path: "banking",
        element: <Banking />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "risk-management",
        element: <RiskManagement />,
      },
      {
        path: "modify-profile/:id",
        element: <ModifyProfile></ModifyProfile>,
      },
      {
        path: "check-users-payment",
        element: <CheckUserPayment></CheckUserPayment>,
      },
      {
        path: "deposit-history",
        element: <DepositHistory></DepositHistory>,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },
    ],
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "deposit/:id",
    element: <DepositPage />,
  },
]);
