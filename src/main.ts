import fetch from "node-fetch";

declare global {
  interface Promise<T> {
    await(): T;
  }
}

async function main() {
  const thenLength = await fetch("https://example.com")
    .then((res) => res.text())
    .then((text) => text.length);
  console.log(`thenLength: ${thenLength}`);

  const singleLineAwaitLength = (
    await (await fetch("https://example.com")).text()
  ).length;
  console.log(`singleLineAwaitLength: ${singleLineAwaitLength}`);

  const res = await fetch("https://example.com");
  const text = await res.text();
  const multiLineAwaitLength = text.length;
  console.log(`multiLineAwaitLength: ${multiLineAwaitLength}`);

  const rustyAwaitLength = fetch("https://example.com")
    .await()
    .text()
    .await().length;

  console.log(`rustyAwaitLength: ${rustyAwaitLength}`);
}

main()
  .then(() => console.log("All done"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
