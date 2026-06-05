import tls from "tls";

export async function checkSSL(
  hostname: string
) {
  return new Promise<{
    valid_to: string;
    daysRemaining: number;
  }>((resolve, reject) => {
    const socket = tls.connect(
      {
        host: hostname,
        port: 443,
        rejectUnauthorized: false,
      },
      () => {
        const cert =
          socket.getPeerCertificate();

        socket.end();

        const expiryDate =
          new Date(cert.valid_to);

        const daysRemaining =
          Math.ceil(
            (expiryDate.getTime() -
              Date.now()) /
              (1000 * 60 * 60 * 24)
          );

        resolve({
          valid_to:
            cert.valid_to,
          daysRemaining,
        });
      }
    );

  socket.on("error", (error) => {
  console.error(
    "SSL socket error:",
    error.message
  );

  resolve({
    valid_to: "",
    daysRemaining: -1,
  });
});
  });
}