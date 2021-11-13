export class Note {
  //public name: string;
  //public text: string;
  constructor(
    public name:string,
    public text:string
  ) {}
  clone():Note {
    return new Note(this.name, this.text);
  }
}
