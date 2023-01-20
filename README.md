# howmanyconfs.com

> How many confirmations are equivalent to 6 Bitcoin confirmations? - [howmanyconfs.com](https://howmanyconfs.com)

[![GitHub Donate](https://badgen.net/badge/GitHub/Sponsor/D959A7?icon=github)](https://github.com/sponsors/lukechilds)
[![Bitcoin Donate](https://badgen.net/badge/Bitcoin/Donate/F19537?icon=bitcoin)](https://blockstream.info/address/3Luke2qRn5iLj4NiFrvLBu2jaEj7JeMR6w)
[![Lightning Donate](https://badgen.net/badge/Lightning/Donate/F6BC41?icon=bitcoin-lightning)](https://tippin.me/@lukechilds?refurl=github.com/lukechilds/docker-electrumx)

Compare the time required for an equivalent amount of work to be completed between different Proof-of-Work blockchains.

[![](/screenshot.png)](https://howmanyconfs.com)

## How are these values calculated?

It's easy to compare blockchain hashrates when the Proof-of-Work algorithm is the same. For example if Bitcoin has a hashrate of SHA-256 @ 150,000 PH/s and Bitcoin Cash has a hashrate of SHA-256 @ 3,000 PH/s, it's easy to see that for a given period of time the Bitcoin blockchain will have 50x (150,000/3,000) the amount of work securing it than the Bitcoin Cash blockchain. Or to say that differently, you need to wait for 50x more Bitcoin Cash confirmations before an equivalent amount of work has been done compared to the Bitcoin blockchain. So 6 Bitcoin confirmations would be roughly equivalent to 300 Bitcoin Cash confirmations in terms of the amount of work done.

However if the Proof-of-Work algorithms are different, how can we compare the hashrate? If we're comparing Bitcoin (SHA-256 @ 150,000 PH/s) against Litecoin (Scrypt @ 350 TH/s), the hashes aren't equal, one round of SHA-256 is not equivalent to one round of Scrypt.

What we really want to know is how much power is being consumed on each chain to provide the current hash rate. Literal power, as in watts. So how can we calculate that?

Well it's actually pretty simple.

- Find the most advanced publically available hardware for a chains PoW algorithm.
- Calculate the devices hashing efficiency in joules per hash (j/h).
- Multiply the chain's hashrate by it's PoW algorithms j/h value.
- Now we have the total watts consumed by the blockchain.

> **Note:** This makes the assumption that every single miner for the blockchain is using the most advanced hardware, which isn't true, but it's close enough.

The power consumption in watts can then be used as a reliable metric to compare Proof-of-Work between chains.

As an example:

**Bitcoin**

- Algo: SHA-256
- Hashrate: 150,000 PH/s
- Best Miner: Antminer S19 Pro (110 TH/s @ 3250 W)
- Joules per hash: 3250 W / 110 TH/s = 0.000000000029545 J
- Watts: 150,000 PH/s * 0.000000000029545 J = 4.43 GW

**Litecoin**

- Algo: Scrypt
- Hashrate: 350 TH/s
- Best Miner: Innosilicon A6+ LTCMaster (2.2Gh/s @ 2100 W)
- Joules per hash: 2100 W / 2.2Gh/s = 0.000000954545455 J
- Watts: 350 TH/s * 0.000000954545455 J = 334 MW

So we can deduce from those calculations, if the entire Bitcoin hashrate was mined by Antminer S19 Pros it would require 4.5 GW of power, and if the entire Litecoin hashrate was mined by Innosilicon A6+s it would require 330 MW of power.

Therefore Litecoin's hashrate is around 7% (330/4500) the power of Bitcoin's, it takes around 14x longer for the Litecoin blockchain to do the same amount of work.

Once we've done the above calculations and got power consumption in watts for each blockchain, we can calculate the equivalent amount of confirmations across chains by factoring in the average block time and calculating the energy required for a given number of blocks. Then we check how many blocks are required on the other blockchain at it's power consumption to expend an equivalent amount of energy.

So to calculate how many Litecoin confirmations are equivalent to 6 Bitcoin confirmations we would do:

- Bitcoin (SHA-256 @ 150,000,338 PH/s = 4.43 GW)
- Litecoin (Scrypt @ 350 TH/s = 334 MW)
- Bitcoin's average block time is 10 minutes (600 seconds)
- 6 Bitcoin confirmations on average is 60 minutes (3,600 seconds)
- Bitcoin's total energy required for 6 confirmations is (4.43 GW * 3,600 seconds) 15.94 terajoules
- At Litecoin's power consumption of 330 MW it would take (15.94 terajoules / 334 MW) 47,724 seconds (13 hours) to complete an equivalent amount of work
- Litecoin's average block time is 2.5 minutes (150 seconds)
- The amount of Litecoin blocks expected over this period of time is (47,724 seconds / 150 seconds) 318 blocks.

Therefore we can say that 318 Litecoin confirmations are roughly equal to 6 Bitcoin confirmations in total amount of work done.

### Notes

#### These metrics are measuring "work done", not security.

More "work done" doesn't necessarily mean "more security".

For example take the following two blockchains:

- Bitcoin Cash (SHA-256 @ 3,000 PH/s = 90 MW)
- Zcash (Equihash @ 6 GH/s = 20 MW)

Bitcoin Cash has higher power consumption than Zcash so we can deduce it has more "work done" over a given timeframe than Zcash.  However does that really mean it's more secure?

Zcash is the dominant blockchain for it's Proof-of-Work algorithm (Equihash). Whereas Bitcoin Cash isn't, it uses the same algorithm as Bitcoin. In fact just 2% of Bitcoin's hashrate is equivalent to all of Bitcoin Cash's hashrate.

This means the cost of a 51% attack against Bitcoin Cash could actually be much lower than a 51% attack against Zcash, even though you need to aquire more MW of hashpower, the cost to aquire that hashpower will likely be lower.

To attack Bitcoin Cash you don't need to acquire any hardware, you just need to convince 2% of the Bitcoin hashrate to lend their SHA-256 hashpower to you.

To attack Zcash, you would likely need to fabricate your own Equihash ASICs, as almost all the Equihash mining hardware in the world is already securing Zcash.

#### Accurately calculating security is much more complicated.

These metrics give a good estimated value to compare the hashrate accross different Proof-of-Work blockchains.

However to calculate if a payment can be considered "finalised" involves many more variables.

You should factor in:

- Is this cryptocurrency the dominant cryptocurrency for it's Proof-of-Work algorithm?
- What is the market cap of this cryptocurrency?
- What is the daily trading volume of this cryptocurrency?
- What is the $ value of this transaction?

If the cryptocurrency isn't the dominant cryptocurrency for it's Proof-of-Work algorithm it can be attacked much more cheaply.

If the market cap or trading volume is really low, an attacker may crash the price of the currency before they can successfully double spend it and make a profit. Although that's more relevant in the context of exchanges rather than individuals accepting payments.

If the value of the transaction is low enough, it may cost more to double spend than an attacker would profit from the double spend.

Ultimately, once the cost of a double spend becomes higher than an attacker can expect to profit from the double spend, that is when a payment can probably be considered "finalised".

## Something wrong?

Do you think I've made a mistake or got something wrong? Please [open an issue](https://github.com/lukechilds/howmanyconfs.com/issues/new) or submit a pull request and let me know!

## Credit

Cryptocurrency data is pulled from [whattomine.com](https://whattomine.com/).

## License

MIT © Luke Childs
