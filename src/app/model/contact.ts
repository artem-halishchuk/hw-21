export class Contact {
  constructor(
    public name:string|null = null,
    public type:string|null = null,
    public value:string|null = null
  ) {}
  clone():Contact {
    return new Contact(this.name, this.type, this.value);
  }
}
