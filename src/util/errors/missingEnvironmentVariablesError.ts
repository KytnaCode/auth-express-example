class MissingEnvironmentVariablesError extends Error {
  constructor(variables: string[]) {
    super();

    this.message =
      `Error has occurred: Missing environment variables: ${variables.filter(v => !Object.values(process.env).includes(v)).join(', ')}`;
  }

  name = 'MissingRequireEnvironmentVariablesError';

}

export default  MissingEnvironmentVariablesError;