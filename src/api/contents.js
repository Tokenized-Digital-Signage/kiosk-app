const contractAddress = "0xD3d1899FA5b97364aF8C3D14555d6B117332150D";
import AdsSpotToken from "../contracts/AdsSpotToken.json";

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

    const abi = AdsSpotToken.abi;
    const contract = new web3.eth.Contract(abi, contractAddress);

    const getTokenURI = async () => {
      return await contract.methods.tokenURI().call();
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
