import { prettyWalletAddress } from "@/utils";
import { type User } from "@clerk/nextjs/server";

export const filterUsernameForClient = (user: User) => {
  if (user.username) {
    return user.username;
  }

  if (user.web3Wallets?.length === 0) {
    return null;
  }

  const address = user.web3Wallets?.[0]?.web3Wallet;

  if (!address) {
    return null;
  }

  return address;
};

export const filterUserForClient = (user: User) => {
  const isWeb3User = user.web3Wallets?.length > 0;

  const username = filterUsernameForClient(user);

  let prettyUsername = null;

  if (username) {
    prettyUsername = isWeb3User ? prettyWalletAddress(username) : username;
  }

  return {
    id: user.id,
    username,
    prettyUsername,
    imageUrl: user.imageUrl,
    isWeb3User,
  };
};
