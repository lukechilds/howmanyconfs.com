// eslint-disable-next-line import/no-unresolved, import/extensions
import svgs from '../node_modules/cryptocurrency-icons/svg/color/*.svg';

const getCoinSVGPath = symbol => svgs[symbol.toLowerCase()] || svgs.generic;

export default getCoinSVGPath;
