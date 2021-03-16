# IoT-Blockchain
it is a project that allows the integration of Blockchain technologies into an IoT system. The added Blockchain layer will preserve an immutable record of transactional data interconnected by blocks. In addition, this will allow secure and efficient sharing of data as well as the establishment of smart contracts as a means of negotiation between different stakeholders, maintain permanent traceability of transactions.
# Pre-Requirement
Before we start lets download all the needed tools.

* Node js https://nodejs.org/en/
* Express js https://expressjs.com/
* React js https://reactjs.org/
* Truffle https://www.trufflesuite.com/docs/truffle
* Ganache https://www.trufflesuite.com/docs/ganache
* Metamask https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
* web3.js https://www.npmjs.com/package/web3
* MySQL https://www.mysql.com
* IPFS Desktop https://ipfs.io/
## How to Build Ethereum Blockchain App
* at first create a project directory <br/>
     mkdir My-Eth-Blockchain-App <br/>
     cd My-Eth-Blockchain-App <br/>
 *  we initialize a new truffle project to develop our project:<br/>
     truffle init
 * the project directory structure that we just created:
   * contracts directory: this is where all smart contacts solidity files.
   * migrations directory: this is where all of the migration files.
   * test directory: this is where we'll write our tests for our smart contract.
   * truffle-config.js file: this is the main configuration file for our Truffle project, like network configuration.
 *  let's compile the smart contract and ensure that there are no errors:
     * truffle compile
 * after compile let's run this migration script
     * truffle migrate
Note: in case of editing the smart contract code, we need the commande 'truffle migrate --reset' to re-deploy it.

### Install the dependencies.

cd myproject <br/>
npm install <br/>

# Start App

* Start mysql db <br/>
users(id , first_name, last_name, email, password, create(timestamp), tel, date) <br/>
data-iot(temperature, air, hiumidite, date) <br/>
* start server app

  * cd myprojet <br/>
  * cd server <br/>
  * npm run devStart<br/>
  check  http://localhost:3001

* start client app

  * cd myproject <br/>
  * npm run start


Finally check your browser at http://localhost:3000

