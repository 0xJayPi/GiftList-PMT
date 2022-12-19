const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
// const { useState } = require("react");

const serverUrl = "http://localhost:1225";
const merkleTree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const root = merkleTree.getRoot();
  const name = niceList[10];
  const index = niceList.findIndex((n) => n === name);

  const proof = merkleTree.getProof(index);

  // const [gift, setGift] = useState(0);
  const body = {
    root: root,
    name: name,
    proof: proof,
  };

  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, body);
    console.log({ gift });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

main();
