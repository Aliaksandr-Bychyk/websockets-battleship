const generateResponse = ({ type, data, id }: { type: string; data: any; id: number }) => {
  return JSON.stringify({ type, data: JSON.stringify(data), id });
};

export default generateResponse;
