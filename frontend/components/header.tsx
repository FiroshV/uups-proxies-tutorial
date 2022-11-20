import { ConnectButton } from "web3uikit";

export default function Header() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
            <div className="text-white font-bold text-2xl">Universal upgradeable proxy standard (UUPS)</div>
            <ConnectButton moralisAuth={false} />
        </nav>
    );
}
