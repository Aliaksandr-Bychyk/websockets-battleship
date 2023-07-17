const deepParser = (str: string) => {
  const data = JSON.parse(str);
  for (const property in data) {
    if (typeof data[property] === 'string') {
      if (data[property].includes('{')) data[property] = deepParser(data[property]);
    }
  }
  return data;
};

export default deepParser;
