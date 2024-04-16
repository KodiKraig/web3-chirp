export const delay = (ms = 2000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const prettyWalletAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
