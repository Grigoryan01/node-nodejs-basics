const parseEnv = () => {
  const envVars = Object.keys(process.env)
    .filter(key => key.startsWith('RSS_'))
    .map(key => `RSS_${key.substring(4)}=${process.env[key]}`)
    .join('; ');
  
  if (envVars) {
    console.log(envVars);
  }
};

parseEnv();
