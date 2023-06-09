import Web3 from "web3";
import AdsSpotToken from "../contracts/AdsSpotToken.json";
const contractAddress = "0x06C96F03934c7799FEae82f62F887BdC9dD5f1fE";
const web3 = new Web3(Web3.givenProvider);

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const contentsApi = {
  async listContents() {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const adsSpotId = params.get('id')

    const contract = new web3.eth.Contract(AdsSpotToken, contractAddress);

    const getContentMetadata = async () => {
      return await contract.methods.getContentMetadata(adsSpotId).call();
    };
    const tokenURI = await getContentMetadata()
    const resuponse = await fetch(tokenURI);
    const metadata = await resuponse.json();
    return [{'downloadUrl': metadata.image, etag: generateRandomString(16)}]
  },
  async getContent(downloadUrl) {
    const response = await fetch(downloadUrl);
    // const contentType = response.headers.get('Content-Type')
    const blobData = await response.blob();
    return blobData
  },
};

export default contentsApi;
