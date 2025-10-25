const parseArgs = () => {
  const args = process.argv.slice(2);
  const result = [];
  
  for (let i = 0; i < args.length; i += 2) {
    if (args[i] && args[i + 1]) {
      const propName = args[i].replace('--', '');
      const value = args[i + 1];
      result.push(`${propName} is ${value}`);
    }
  }
  
  if (result.length > 0) {
    console.log(result.join(', '));
  }
};

parseArgs();
