import Web3 from "web3";
import AdsSpotToken from "../contracts/AdsSpotToken.json";
const contractAddress = "0x16304acc2650c8e92091ab220a9cbd8561ce3516";
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

    console.log(AdsSpotToken)
    const contract = new web3.eth.Contract(AdsSpotToken, contractAddress);

    const getTokenURI = async () => {
      return await contract.methods.tokenURI(adsSpotId).call();
    };
    const tokenURI = await getTokenURI()
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
