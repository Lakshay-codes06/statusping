import tls from "tls";

export async function checkSSL(
  hostname: string
) {
  return new Promise(
    (resolve, reject) => {
      const socket = tls.connect({
        host: hostname,
        port: 443,
        rejectUnauthorized: false,
      }, () => {
        const cert =
          socket.getPeerCertificate();

        socket.end();

        resolve({
          valid_to: cert.valid_to,
        });
      });

      socket.on(
        "error",
        reject
      );
    }
  );
}