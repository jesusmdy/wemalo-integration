export function compareErrorString(error: any, value: string): boolean {
  const errorString = error.toString();
  const toCompare = `Error: ${value}`;
  return errorString === toCompare
}