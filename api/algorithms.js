const ANTMINER_S19_PRO_WATTAGE = 3250;
const RTX_3090_WATTAGE = 285;
const INNOSILICON_A6_PLUS_WATTAGE = 2100;
const AMD_THREADRIPPER_1920X_WATTAGE = 180;
const STU_U6_WATTAGE = 2200;
const ANTMINER_Z15_WATTAGE = 1510;
const STU_U1_PLUSPLUS_WATTAGE = 2200;
const GOLDSHELL_CK5_WATTAGE = 2400;

const rawHashes = (hashes, unit) => {
	const multiplier = {
		H: 1000 ** 0,
		KH: 1000 ** 1,
		MH: 1000 ** 2,
		GH: 1000 ** 3,
		TH: 1000 ** 4,
		PH: 1000 ** 5
	};

	return hashes * multiplier[unit];
};

const getAlgorithms = () => [
	{ // https://www.asicminervalue.com/miners/bitmain/antminer-s19-pro-110th
		name: 'SHA-256',
		joulesPerHash: ANTMINER_S19_PRO_WATTAGE / rawHashes(110, 'TH')
	},
	{ // https://www.nicehash.com/profitability-calculator/nvidia-rtx-3090
		name: 'Ethash',
		joulesPerHash: RTX_3090_WATTAGE / rawHashes(120, 'MH')
	},
	{ // https://www.asicminervalue.com/miners/innosilicon/a6-ltcmaster-1
		name: 'Scrypt',
		joulesPerHash: INNOSILICON_A6_PLUS_WATTAGE / rawHashes(2.2, 'GH')
	},
	{ // https://www.nicehash.com/profitability-calculator/amd-cpu-threadripper-1920x
		name: 'RandomX',
		joulesPerHash: AMD_THREADRIPPER_1920X_WATTAGE / rawHashes(7.24, 'KH')
	},
	{ // https://minerstat.com/hardware/nvidia-rtx-3090
		name: 'Etchash',
		joulesPerHash: RTX_3090_WATTAGE / rawHashes(121.16, 'MH')
	},
	{ // https://www.asicminervalue.com/miners/strongu/stu-u6
		name: 'X11',
		joulesPerHash: STU_U6_WATTAGE / rawHashes(440, 'GH')
	},
	{ // https://www.asicminervalue.com/miners/bitmain/antminer-z15
		name: 'Equihash',
		joulesPerHash: ANTMINER_Z15_WATTAGE / rawHashes(420, 'KH')
	},
	{ // https://www.asicminervalue.com/miners/strongu/stu-u1-2
		name: 'Blake (14r)',
		joulesPerHash: STU_U1_PLUSPLUS_WATTAGE / rawHashes(52, 'TH')
	},
	{ // https://www.nicehash.com/profitability-calculator/nvidia-rtx-3090
		name: 'Zhash',
		joulesPerHash: RTX_3090_WATTAGE / rawHashes(136.15, 'H')
	},
	{ // https://www.nicehash.com/profitability-calculator/nvidia-rtx-3090
		name: 'KawPow',
		joulesPerHash: RTX_3090_WATTAGE / rawHashes(54, 'MH')
	},
	{ // https://www.asicminervalue.com/miners/goldshell/ck5
		name: 'Eaglesong',
		joulesPerHash: GOLDSHELL_CK5_WATTAGE / rawHashes(12, 'TH')
	}
];

module.exports = async (request, response) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	response.json(await getAlgorithms())
};
module.exports.getAlgorithms = getAlgorithms;
