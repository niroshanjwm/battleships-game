export const sleep = async (milliseconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
};

export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
