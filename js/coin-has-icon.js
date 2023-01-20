// eslint-disable-next-line import/no-unresolved, import/extensions
import svgs from '../node_modules/cryptocurrency-icons/svg/color/*.svg';

const coinHasIcon = symbol => Boolean(svgs[symbol.toLowerCase()]);

export default coinHasIcon;
