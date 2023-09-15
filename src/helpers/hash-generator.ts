export class HashGenerator {
  generate(): string {
    const hash = Math.random().toString(36).slice(7);
    return hash;
  }
}
