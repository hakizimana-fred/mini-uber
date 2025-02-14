export function validatePort(port: string | number): number | null {
  const portNumber = Number(port);

  if (isNaN(portNumber)) {
    return null;
  }

  if (portNumber < 1 || portNumber > 65535) {
    return null;
  }

  if (Math.floor(portNumber) !== portNumber) {
    return null;
  }

  return portNumber;
}
