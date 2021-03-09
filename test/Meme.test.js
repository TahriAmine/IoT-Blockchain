const { Item } = require('react-bootstrap/lib/Breadcrumb')

const Meme = artifacts.require("./Meme");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Meme', (accounts) => {
    let meme

    describe('deployment', async()=>{
        it('deploys successfully',async()=>{
            meme = await Meme.deployed()
            const address = meme.address
            console.log(address)
        })
    })
})