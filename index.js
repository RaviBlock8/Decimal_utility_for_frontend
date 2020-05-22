"use strict";
exports.__esModule = true;
var sdk_1 = require("@uniswap/sdk");
var units_1 = require("@ethersproject/units");
var token = new sdk_1.Token(
  sdk_1.ChainId.MAINNET,
  "0xc0FFee0000000000000000000000000000000000",
  18,
  "HOT",
  "Caffeine"
);
function tryParseAmount(value, token) {
  if (!value || !token) {
    return;
  }
  try {
    var typedValueParsed = units_1.parseUnits(value, token.decimals).toString();
    if (typedValueParsed !== "0") {
      return new sdk_1.TokenAmount(token, sdk_1.JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug('Failed to parse input amount: "' + value + '"', error);
  }
  // necessary for all paths to return a value
  return;
}

console.log(tryParseAmount("12.345", token));
