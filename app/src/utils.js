export const getRandomArbitrary = (min, max) =>  {
  return Math.round(Math.random() * (max - min) + min);
};
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
