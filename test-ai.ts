async function test() {
  try {
    console.log("Starting test...");

    const response = await fetch(
      "http://localhost:3000/api/ai-draft",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monitorName: "Google",
          url: "https://google.com",
          error: "Connection timeout",
        }),
      }
    );

    console.log(
      "Response status:",
      response.status
    );

    const data =
      await response.json();

    console.log(
      "Response data:"
    );
    console.log(data);
  } catch (error) {
    console.error(
      "TEST ERROR:",
      error
    );
  }
}

test();
test();