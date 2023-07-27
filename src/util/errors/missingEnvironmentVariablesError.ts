class MissingEnvironmentVariablesError extends Error {
  constructor(...variables: string[]) {
    super();

    this.message = `Error has occurred: Missing environment variables: ${variables.join(', ')}`;
  }

  name = 'MissingRequireEnvironmentVariablesError';

}

export default  MissingEnvironmentVariablesError;