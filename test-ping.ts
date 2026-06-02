import { pingUrl } from "./lib/ping";

async function main() {
  const result = await pingUrl("https://google.com");
  console.log(result);
}

main();