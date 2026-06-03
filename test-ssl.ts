import { checkSSL } from "./lib/ssl";

async function test() {
  const result =
    await checkSSL("google.com");

  console.log(result);
}

test();