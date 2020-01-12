export class InvalidConfigurationException extends Error {
  public constructor(
    public readonly invalidField,
    public readonly invalidCause,
  ) {
    super(
      `Options validation failed, "${invalidField}" invalid — ${invalidCause}`,
    )
  }
}
