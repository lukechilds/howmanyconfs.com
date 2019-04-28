# howmanyconfs.com

> How many confirmations are equivalent to 6 Bitcoin confirmations? - [howmanyconfs.com](https://howmanyconfs.com)

[![Build Status](https://travis-ci.com/lukechilds/howmanyconfs.com.svg?branch=master)](https://travis-ci.com/lukechilds/howmanyconfs.com)
[![tippin.me](https://badgen.net/badge/%E2%9A%A1%EF%B8%8Ftippin.me/@lukechilds/F0918E)](https://tippin.me/@lukechilds)

Compare the time required for an equivalent amount of work to be completed between different Proof-of-Work blockchains.

[![](/screenshot.png)](https://howmanyconfs.com)

## How are these values calculated?

It's easy to compare blockchain hashrates when the Proof-of-Work algorithm is the same. For example if Bitcoin has a hashrate of SHA-256 @ 40 PH/s and Bitcoin Cash has a hashrate of SHA-256 @ 2 PH/s, it's easy to see that for a given period of time the Bitcoin blockchain will have 20x (40/2) the amount of work securing it than the Bitcoin Cash blockchain. Or to say that differently, you need to wait for 20x more Bitcoin Cash confirmations before an equivalent amount of work has been done compared to the Bitcoin blockchain. So 6 Bitcoin confirmations would be roughly equivalent to 120 Bitcoin Cash confirmations in the amount of work done.

However if the Proof-of-Work algorithms are different, how can we compare the hashrate? If we're comparing Bitcoin (SHA-256 @ 40 PH/s) against Litecoin (Scrypt @ 300 TH/s), the hashes aren't equal, one round of SHA-256 is not equivalent to one round of Scrypt.

What we really want to know is how much energy is being consumed to provide the current hash rate. Literal energy, as in joules or kilowatt hours. It would be great if we had a universal metric across blockchains like kWh/s to measure immutability.

However that's fairly hard to calculate, we need to know the average power consumption of the average device used to mine. For GPU/CPU mined Proof-of-Work algorithms this varies greatly. For ASIC mined Proof-of-Work algorithms it varies less, however it's likely that ASIC manufacturers are mining with next generation hardware long before the public is made aware of them, which we can't account for.

There's no automated way to get this data and no reliable data source to scrape it from. We'd need to manually research all mining hardware and collate the data ourself. And as soon as newer mining hardware comes out our results will be outdated.

Is there a simpler way to get an estimated amount of work per blockchain in a single metric we can use for comparisons?

Yeah, there is, we can use NiceHash prices to estimate the cost in $ to secure a blockchain for a given timeframe. This is directly comparable across blockchains and should be directly proportionate to kWh/s, because after all, the energy needs to be paid for in $.

How can we estimate this?

- Get the blockchains Proof-of-Work algorithm
- Lookup the average price per hash on NiceHash for this algorithm
- Multiply price per hash by total hashrate per second

Now we have an estimated total Proof-of-Work metric measured in dollars per second ($/s).

The $/s metric may not be that accurate. Miners will mark up the cost when reselling on NiceHash and we're making the assumption that NiceHash supply is infinite. You can't actually rent 100% of Bitcoin's hashpower from NiceHash, there isn't enough supply.

However that's not really an issue for this metric, we aren't trying to calculate the theoretical cost to rent an *additional* 100% of the hashrate, we're trying to get a figure that allows us to compare the cost of the *current* total hashrate accross blockchains. Even if the exact $ value we end up with is not that accurate, it should still be proportionate to kWh/s. This means it's still an accurate metric to compare the difference in work done over a given amount of time between blockchains.

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


## License

MIT © Luke Childs
