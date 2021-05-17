# howmanyconfs.com

> How many confirmations are equivalent to 6 Bitcoin confirmations? - [howmanyconfs.com](https://howmanyconfs.com)

[![Build Status](https://travis-ci.com/lukechilds/howmanyconfs.com.svg?branch=master)](https://travis-ci.com/lukechilds/howmanyconfs.com)
[![GitHub Donate](https://badgen.net/badge/GitHub/Sponsor/D959A7?icon=github)](https://github.com/sponsors/lukechilds)
[![Bitcoin Donate](https://badgen.net/badge/Bitcoin/Donate/F19537?icon=bitcoin)](https://blockstream.info/address/3Luke2qRn5iLj4NiFrvLBu2jaEj7JeMR6w)
[![Lightning Donate](https://badgen.net/badge/Lightning/Donate/F6BC41?icon=bitcoin-lightning)](https://tippin.me/@lukechilds?refurl=github.com/lukechilds/docker-electrumx)

Compare the time required for an equivalent amount of work to be completed between different Proof-of-Work blockchains.

[![](/screenshot.png)](https://howmanyconfs.com)

## How are these values calculated?

It's easy to compare blockchain hashrates when the Proof-of-Work algorithm is the same. For example if Bitcoin has a hashrate of SHA-256 @ 40 PH/s and Bitcoin Cash has a hashrate of SHA-256 @ 2 PH/s, it's easy to see that for a given period of time the Bitcoin blockchain will have 20x (40/2) the amount of work securing it than the Bitcoin Cash blockchain. Or to say that differently, you need to wait for 20x more Bitcoin Cash confirmations before an equivalent amount of work has been done compared to the Bitcoin blockchain. So 6 Bitcoin confirmations would be roughly equivalent to 120 Bitcoin Cash confirmations in the amount of work done.

However if the Proof-of-Work algorithms are different, how can we compare the hashrate (or hash power)? If we're comparing Bitcoin (SHA-256 @ 40 PH/s) against Litecoin (Scrypt @ 300 TH/s), the hashes aren't equal, one round of SHA-256 is not equivalent to one round of Scrypt.

What we really want to know is how much electrical power is being consumed to provide the current hash power. Literal electrical power, in Watt. It would be great if we had a universal metric across blockchains like kW to measure immutability. Once we have a common unit for hash power (electrical power in Watt), we can calculate the amount of work (energy) in Wh (or better kWh) realized by the network in a given amount of time, or the time needed to perform a given amount of work.

However that's fairly hard to calculate, we need to know the average power consumption of the average device used to mine. For GPU/CPU mined Proof-of-Work algorithms this varies greatly. For ASIC mined Proof-of-Work algorithms it varies less, however it's likely that ASIC manufacturers are mining with next generation hardware long before the public is made aware of them, which we can't account for.

There's no automated way to get this data and no reliable data source to scrape it from. We'd need to manually research all mining hardware and collate the data ourself. And as soon as newer mining hardware comes out our results will be outdated.

Is there a simpler way to get an estimated amount of work per blockchain in a single metric we can use for comparisons?

Yeah, there is, we can use NiceHash prices to estimate the cost in $ to secure a blockchain for a given timeframe. This is directly comparable across blockchains and should be directly proportional to the hash power in Watt, because after all, the energy needs to be paid for in $.

How can we estimate this?

- Get the blockchains Proof-of-Work algorithm
- Lookup the average price per hash on NiceHash for this algorithm
- Multiply price per hash by total hashrate (hashes per second).

Now we have an estimated total hash-power metric measured in dollars per second ($/s).

The $/s metric may not be that accurate. Miners will mark up the cost when reselling on NiceHash and we're making the assumption that NiceHash supply is infinite. You can't actually rent 100% of Bitcoin's hashpower from NiceHash, there isn't enough supply.

However that's not really an issue for this metric, we aren't trying to calculate the theoretical cost to rent an *additional* 100% of the hashrate, we're trying to get a figure that allows us to compare the cost of the *current* total hashrate accross blockchains. Even if the exact $ value we end up with is not that accurate, it should still be proportional to kWh. This means it's still an accurate metric to compare the difference in work done over a given amount of time between blockchains.

So how do we compare these values between blockchains?

Once we've done the above calculations and got a $/s cost for each blockchain, we just need to factor in the average block time and calculate the total $ cost for a given number of confirmations. Then see how much time is required on the other blockchain at it's $/s value to equal the total cost.

So to calculate how many Litecoin confirmations are equivalent to 6 Bitcoin confirmations we would do:

- Bitcoin (SHA-256 @ 40 PH/s) or ($100/s)
- Litecoin (Scrypt @ 300 TH/s) or ($10/s)
- Bitcoin's average block time is 10 minutes (600 seconds)
- 6 Bitcoin confirmations on average is 60 minutes (3,600 seconds)
- Bitcoin's total $ cost for 6 confirmations is ($100 * 3,600 seconds) $360,000
- At Litecoin's hashrate of $10/s it would take ($360,000 / $10) 36,000 seconds (10 hours) to complete an equivalent amount of work
- Litecoin's average block time is 2.5 minutes (150 seconds)
- The amount of Litecoin blocks expected over this period of time is (36,000 seconds / 150 seconds) 240 blocks.

Therefore we can say that 240 Litecoin confirmations are roughly equal to 6 Bitcoin confirmations in total amount of work done.

### Notes

#### $/s doesn't mean what it sounds like it means.

The $/s values should not be taken as literal costs.

For example:

> - Bitcoin's total $ cost for 6 confirmations is ($100 * 3,600 seconds) $360,000

This is does not mean you could do a 51% attack on Bitcoin and roll back 6 blocks for a cost of $360,000. An attack like that would be much more expensive.

The $/s value is a metric to compare the amount of work at the current hashrate between blockchains. It is not the same as the cost to add hashrate to the network.

When adding hashrate to a network the cost will not scale linearly with hashrate. It will jump suddenly at certain intervals.

For example, once you've used up the available hashrate on NiceHash you need to add the costs of purchasing ASICs, then once you've bought all the ASICs in the world, you'd need to add the costs of fabricating your own chips to keep increasing hashrate.

#### These metrics are measuring "work done", not security.

More "work done" doesn't necessarily mean "more security".

For example take the following two blockchains:

- Bitcoin Cash (SHA-256 @ 2 PH/s) or ($5/s)
- Zcash (Equihash @ 4 GH/s) or ($3/s)

Bitcoin Cash has a higher $/s value than Zcash so we can deduce it has more hash-power than Zcash. More kWh are required to secure it's blockchain. However does that really mean it's safer?

Zcash is the dominant blockchain for it's Proof-of-Work algorithm (Equihash). Whereas Bitcoin Cash isn't, it uses the same algorithm as Bitcoin. In fact just 5% of Bitcoin's hashrate is equivalent to all of Bitcoin Cash's hashrate.

This means the cost of a 51% attack against Bitcoin Cash could actually be much lower than a 51% attack against Zcash, even though you need to aquire more kWh of work, the cost to aquire those kWh will likely be lower.

To attack Bitcoin Cash you don't need to acquire any hardware, you just need to convince 5% of the Bitcoin hashrate to lend their SHA-256 hashpower to you.

To attack Zcash, you would likely need to fabricate your own Equihash ASICs, as almost all the Equihash mining hardware in the world is already securing Zcash.

#### Accurately calculating security is much more complicated.

These metrics give a good estimated value to compare the hashrate accross different Proof-of-Work blockchains.

However to calculate if a payment can be considered "finalised" involves many more variables.

You should factor in:

- Is this cryptocurrency the dominant cryptocurrency for it's Proof-of-Work algorithm?
- What is the market cap of this cryptocurrency?
- What is the daily trading volume of this cryptocurrency?
- What is the $ value of this transaction?
- What is the probability of a successful double-spend, given the attacker's hashrate?

If the cryptocurrency doesn't dominate the Proof-of-Work it can be attacked more cheaply.

If the market cap or trading volume is really low, an attacker may crash the price of the currency before they can successfully double spend it and make a profit. Although that's more relevant in the context of exchanges rather than individuals accepting payments.

If the value of the transaction is low enough, it may cost more to double spend than an attacker would profit from the double spend.

If the attacker can't muster a high enough percentage of the network hashrate, a double-spend attempt can fail, increasing the average cost of a successful attack. The probability depends on the number of confirmations and the effective hashrate of the attacker, but not on the time between blocks, giving an advantage to networks with faster blocks. This is discussed [here](https://arxiv.org/pdf/1402.2009.pdf).

Ultimately, once the cost of a double spend becomes higher than an attacker can expect to profit from the double spend, that is when a payment can probably be considered "finalised".

## Something wrong?

Do you think I've made a mistake or got something wrong? Please [open an issue](https://github.com/lukechilds/howmanyconfs.com/issues/new) or submit a pull request and let me know!

## Credit

Data is sourced from [whattomine.com](https://whattomine.com/) and [nicehash.com](https://www.nicehash.com/).

## License

MIT © Luke Childs
