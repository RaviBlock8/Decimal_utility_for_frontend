import { TokenAmount, JSBI, ChainId, Token } from "@uniswap/sdk";
import { parseUnits } from "@ethersproject/units";

const token = new Token(
  ChainId.MAINNET,
  "0xc0FFee0000000000000000000000000000000000",
  18,
  "HOT",
  "Caffeine"
);

function tryParseAmount(
  value?: string,
  token?: Token
): TokenAmount | undefined {
  if (!value || !token) {
    return;
  }
  try {
    const typedValueParsed = parseUnits(value, token.decimals).toString();
    if (typedValueParsed !== "0") {
      return new TokenAmount(token, JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return;
}
